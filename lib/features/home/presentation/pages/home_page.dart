import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../app/theme/app_theme.dart';
import '../widgets/quick_action_card.dart';
import '../widgets/destination_card.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TripMate'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildGreeting(),
            const SizedBox(height: 24),
            _buildQuickActions(context),
            const SizedBox(height: 24),
            _buildRecentTrips(),
            const SizedBox(height: 24),
            _buildPopularDestinations(),
          ],
        ),
      ),
    );
  }

  Widget _buildGreeting() {
    final hour = DateTime.now().hour;
    String greeting;
    if (hour < 12) {
      greeting = '早上好';
    } else if (hour < 18) {
      greeting = '下午好';
    } else {
      greeting = '晚上好';
    }
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$greeting，旅行者！',
          style: const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          '今天想去哪里探索？',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey.shade600,
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActions(BuildContext context) {
    final actions = [
      {'icon': Icons.auto_awesome, 'label': 'AI规划', 'color': AppTheme.primaryColor, 'route': '/planning'},
      {'icon': Icons.map, 'label': '导航导览', 'color': AppTheme.secondaryColor, 'route': '/map'},
      {'icon': Icons.restaurant_menu, 'label': '美食推荐', 'color': Colors.orange, 'route': '/food'},
      {'icon': Icons.security, 'label': '安全保障', 'color': Colors.red, 'route': '/safety'},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: actions.length,
      itemBuilder: (context, index) {
        final action = actions[index];
        return QuickActionCard(
          icon: action['icon'] as IconData,
          label: action['label'] as String,
          color: action['color'] as Color,
          onTap: () => context.push(action['route'] as String),
        );
      },
    );
  }

  Widget _buildRecentTrips() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '最近的旅行',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
      ],
    );
  }

  Widget _buildPopularDestinations() {
    final destinations = [
      {'name': '北京', 'image': 'https://picsum.photos/seed/beijing/400/300', 'spots': 128},
      {'name': '上海', 'image': 'https://picsum.photos/seed/shanghai/400/300', 'spots': 156},
      {'name': '成都', 'image': 'https://picsum.photos/seed/chengdu/400/300', 'spots': 89},
      {'name': '杭州', 'image': 'https://picsum.photos/seed/hangzhou/400/300', 'spots': 102},
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '热门目的地',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 180,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: destinations.length,
            itemBuilder: (context, index) {
              final dest = destinations[index];
              return DestinationCard(
                name: dest['name'] as String,
                imageUrl: dest['image'] as String,
                spotsCount: dest['spots'] as int,
              );
            },
          ),
        ),
      ],
    );
  }
}
