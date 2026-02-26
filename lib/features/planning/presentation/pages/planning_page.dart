import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/providers/planning_provider.dart';
import '../widgets/style_selector.dart';
import 'trip_detail_page.dart';

final planningProvider = StateNotifierProvider<PlanningProvider, PlanningState>((ref) {
  return PlanningProvider();
});

class PlanningState {
  final bool isLoading;
  final String? error;
  final dynamic generatedTrip;
  final TripRequest? lastRequest;

  PlanningState({
    this.isLoading = false,
    this.error,
    this.generatedTrip,
    this.lastRequest,
  });

  PlanningState copyWith({
    bool? isLoading,
    String? error,
    dynamic generatedTrip,
    TripRequest? lastRequest,
  }) {
    return PlanningState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      generatedTrip: generatedTrip ?? this.generatedTrip,
      lastRequest: lastRequest ?? this.lastRequest,
    );
  }
}

class PlanningPage extends ConsumerStatefulWidget {
  const PlanningPage({super.key});

  @override
  ConsumerState<PlanningPage> createState() => _PlanningPageState();
}

class _PlanningPageState extends ConsumerState<PlanningPage> {
  final _destinationController = TextEditingController();
  DateTime? _startDate;
  DateTime? _endDate;
  int _travelers = 2;
  double _budget = 3000;
  TripStyle? _selectedStyle;

  @override
  void dispose() {
    _destinationController.dispose();
    super.dispose();
  }

  Future<void> _selectStartDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _startDate ?? DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    if (date != null) {
      setState(() {
        _startDate = date;
        if (_endDate != null && _endDate!.isBefore(date)) {
          _endDate = date;
        }
      });
    }
  }

  Future<void> _selectEndDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _endDate ?? _startDate ?? DateTime.now(),
      firstDate: _startDate ?? DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    if (date != null) {
      setState(() {
        _endDate = date;
      });
    }
  }

  void _generateTrip() {
    if (_destinationController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('请输入目的地')),
      );
      return;
    }
    if (_startDate == null || _endDate == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('请选择日期')),
      );
      return;
    }
    if (_selectedStyle == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('请选择旅行风格')),
      );
      return;
    }

    ref.read(planningProvider.notifier).generateTrip(TripRequest(
      destination: _destinationController.text,
      startDate: _startDate!,
      endDate: _endDate!,
      travelers: _travelers,
      budget: _budget,
      style: _selectedStyle!,
    ));
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(planningProvider);

    if (state.generatedTrip != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => TripDetailPage(
              trip: state.generatedTrip!,
            ),
          ),
        );
        ref.read(planningProvider.notifier).clearTrip();
      });
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('AI 行程规划'),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle('目的地'),
            const SizedBox(height: 8),
            TextField(
              controller: _destinationController,
              decoration: InputDecoration(
                hintText: '请输入目的地（如：北京、上海、杭州）',
                prefixIcon: const Icon(Icons.location_on),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: Colors.grey[50],
              ),
            ),
            const SizedBox(height: 24),
            _buildSectionTitle('出行日期'),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: _DatePickerButton(
                    label: '出发日期',
                    date: _startDate,
                    onTap: _selectStartDate,
                  ),
                ),
                const SizedBox(width: 12),
                const Icon(Icons.arrow_forward, color: Colors.grey),
                const SizedBox(width: 12),
                Expanded(
                  child: _DatePickerButton(
                    label: '返回日期',
                    date: _endDate,
                    onTap: _selectEndDate,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSectionTitle('出行人数'),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.grey[50],
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey[300]!),
              ),
              child: Row(
                children: [
                  const Icon(Icons.people, color: Colors.grey),
                  const SizedBox(width: 12),
                  IconButton(
                    onPressed: () {
                      if (_travelers > 1) setState(() => _travelers--);
                    },
                    icon: const Icon(Icons.remove_circle_outline),
                    color: Theme.of(context).primaryColor,
                  ),
                  Text(
                    '$_travelers 人',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      if (_travelers < 20) setState(() => _travelers++);
                    },
                    icon: const Icon(Icons.add_circle_outline),
                    color: Theme.of(context).primaryColor,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            _buildSectionTitle('预算范围'),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey[50],
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey[300]!),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('¥0', style: TextStyle(color: Colors.grey)),
                      Text(
                        '¥${_budget.toInt()}',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                      const Text('¥100000', style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                  Slider(
                    value: _budget,
                    min: 0,
                    max: 100000,
                    divisions: 100,
                    activeColor: Theme.of(context).primaryColor,
                    onChanged: (value) {
                      setState(() => _budget = value);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            StyleSelector(
              selectedStyle: _selectedStyle,
              onStyleSelected: (style) {
                setState(() => _selectedStyle = style);
              },
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: state.isLoading ? null : _generateTrip,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).primaryColor,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: state.isLoading
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.auto_awesome, size: 24),
                          SizedBox(width: 8),
                          Text(
                            'AI 生成行程',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
              ),
            ),
            if (state.error != null) ...[
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.red[50],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.error_outline, color: Colors.red),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        state.error!,
                        style: const TextStyle(color: Colors.red),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w600,
      ),
    );
  }
}

class _DatePickerButton extends StatelessWidget {
  final String label;
  final DateTime? date;
  final VoidCallback onTap;

  const _DatePickerButton({
    required this.label,
    required this.date,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
        decoration: BoxDecoration(
          color: Colors.grey[50],
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey[300]!),
        ),
        child: Row(
          children: [
            const Icon(Icons.calendar_today, size: 18, color: Colors.grey),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                date != null ? '${date!.month}月${date!.day}日' : label,
                style: TextStyle(
                  color: date != null ? Colors.black87 : Colors.grey,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
