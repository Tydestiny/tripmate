import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../shared/models/trip.dart';
import '../../data/services/ai_service.dart';

enum TripStyle {
  budget('穷游', '💰'),
  comfortable('舒适', '🏨'),
  luxury('豪华', '💎'),
  family('亲子', '👨‍👩‍👧'),
  couple('情侣', '💕'),
  culture('文化', '🏛️'),
  food('美食', '🍜');

  final String label;
  final String emoji;
  const TripStyle(this.label, this.emoji);
}

class TripRequest {
  final String destination;
  final DateTime startDate;
  final DateTime endDate;
  final int travelers;
  final double budget;
  final TripStyle style;

  TripRequest({
    required this.destination,
    required this.startDate,
    required this.endDate,
    required this.travelers,
    required this.budget,
    required this.style,
  });
}

class PlanningProvider extends StateNotifier<Trip?> {
  bool _isLoading = false;
  String? _error;
  TripRequest? _lastRequest;

  PlanningProvider() : super(null);

  bool get isLoading => _isLoading;
  String? get error => _error;
  TripRequest? get lastRequest => _lastRequest;

  Future<void> generateTrip(TripRequest request) async {
    _isLoading = true;
    _error = null;
    _lastRequest = request;
    state = null;

    try {
      state = await AIService.generateTrip(
        destination: request.destination,
        startDate: request.startDate,
        endDate: request.endDate,
        travelers: request.travelers,
        budget: request.budget,
        style: request.style.label,
      );
    } catch (e) {
      _error = '生成行程失败: $e';
    } finally {
      _isLoading = false;
    }
  }

  void clearTrip() {
    state = null;
    _error = null;
    _lastRequest = null;
  }
}
