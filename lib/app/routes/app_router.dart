import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/home/presentation/pages/home_page.dart';
import '../../features/planning/presentation/pages/planning_page.dart';
import '../../features/planning/presentation/pages/trip_detail_page.dart';
import '../../features/navigation/presentation/pages/map_page.dart';
import '../../features/food/presentation/pages/food_page.dart';
import '../../features/safety/presentation/pages/safety_page.dart';
import '../../features/profile/presentation/pages/profile_page.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(
            path: '/',
            name: 'home',
            builder: (context, state) => const HomePage(),
          ),
          GoRoute(
            path: '/planning',
            name: 'planning',
            builder: (context, state) => const PlanningPage(),
          ),
          GoRoute(
            path: '/trip/:id',
            name: 'trip_detail',
            builder: (context, state) => TripDetailPage(
              tripId: state.pathParameters['id']!,
            ),
          ),
          GoRoute(
            path: '/map',
            name: 'map',
            builder: (context, state) => const MapPage(),
          ),
          GoRoute(
            path: '/food',
            name: 'food',
            builder: (context, state) => const FoodPage(),
          ),
          GoRoute(
            path: '/safety',
            name: 'safety',
            builder: (context, state) => const SafetyPage(),
          ),
          GoRoute(
            path: '/profile',
            name: 'profile',
            builder: (context, state) => const ProfilePage(),
          ),
        ],
      ),
    ],
  );
});

class MainShell extends StatelessWidget {
  final Widget child;
  
  const MainShell({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _calculateSelectedIndex(context),
        onTap: (index) => _onItemTapped(index, context),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: Theme.of(context).colorScheme.primary,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
          BottomNavigationBarItem(icon: Icon(Icons.map), label: '导航'),
          BottomNavigationBarItem(icon: Icon(Icons.restaurant), label: '美食'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
        ],
      ),
    );
  }

  int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    if (location.startsWith('/map')) return 1;
    if (location.startsWith('/food')) return 2;
    if (location.startsWith('/profile')) return 3;
    return 0;
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go('/');
        break;
      case 1:
        context.go('/map');
        break;
      case 2:
        context.go('/food');
        break;
      case 3:
        context.go('/profile');
        break;
    }
  }
}
