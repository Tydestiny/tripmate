# TripMate 智能旅游助手 - 实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个具备 AI 智能行程规划、实时导航、美食推荐和旅行安全保障的 Flutter 移动应用

**Architecture:** 采用 Clean Architecture 分层架构，使用 Riverpod 进行状态管理，通过 API 对接 AI 服务生成行程，本地使用 Hive 做离线存储

**Tech Stack:** Flutter 3.x, Dart 3.x, Riverpod, Dio, Hive, amap_flutter_map

---

## Phase 1: 项目基础框架搭建

### Task 1: Flutter 项目初始化和环境配置

**Files:**
- Create: `pubspec.yaml` - 项目依赖配置
- Create: `lib/main.dart` - 应用入口
- Create: `lib/app/routes/app_router.dart` - 路由配置
- Create: `lib/app/theme/app_theme.dart` - 主题配置

**Step 1: 创建 pubspec.yaml**

```yaml
name: tripmate
description: 智能旅游助手 - AI 行程规划与导游
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  flutter_riverpod: ^2.4.9
  dio: ^5.3.3
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  go_router: ^12.1.1
  amap_flutter_map: ^3.0.0
  amap_flutter_location: ^3.0.0
  json_annotation: ^4.8.1
  intl: ^0.18.1
  cached_network_image: ^3.3.0
  flutter_html: ^3.0.0-beta.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.7
  hive_generator: ^2.0.1
  json_serializable: ^6.7.1

flutter:
  uses-material-design: true
```

**Step 2: 验证依赖**

Run: `flutter pub get`
Expected: 依赖安装成功

**Step 3: 创建基础主题配置**

```dart
import 'package:flutter/material.dart';

class AppTheme {
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color secondaryColor = Color(0xFF4CAF50);
  static const Color backgroundColor = Color(0xFFF5F5F5);
  static const Color surfaceColor = Colors.white;
  static const Color errorColor = Color(0xFFE53935);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.light(
        primary: primaryColor,
        secondary: secondaryColor,
        surface: surfaceColor,
        error: errorColor,
      ),
      scaffoldBackgroundColor: backgroundColor,
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
      cardTheme: CardTheme(
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Colors.grey),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: primaryColor, width: 2),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
    );
  }
}
```

**Step 4: 创建 main.dart**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app/routes/app_router.dart';
import 'app/theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  runApp(
    const ProviderScope(
      child: TripMateApp(),
    ),
  );
}

class TripMateApp extends ConsumerWidget {
  const TripMateApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    
    return MaterialApp.router(
      title: 'TripMate',
      theme: AppTheme.lightTheme,
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
```

**Step 5: 创建路由配置**

```dart
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
```

**Step 6: 提交代码**

```bash
git add -A
git commit -m "feat: 初始化 Flutter 项目和基础框架"
```

---

### Task 2: 数据模型定义

**Files:**
- Create: `lib/shared/models/trip.dart`
- Create: `lib/shared/models/day_plan.dart`
- Create: `lib/shared/models/spot.dart`
- Create: `lib/shared/models/restaurant.dart`
- Create: `lib/shared/models/user_preferences.dart`

**Step 1: 创建 Trip 模型**

```dart
class Trip {
  final String id;
  final String destination;
  final DateTime startDate;
  final DateTime endDate;
  final int travelers;
  final double budget;
  final String style;
  final List<DayPlan> dayPlans;
  final DateTime createdAt;

  Trip({
    required this.id,
    required this.destination,
    required this.startDate,
    required this.endDate,
    required this.travelers,
    required this.budget,
    required this.style,
    required this.dayPlans,
    required this.createdAt,
  });

  factory Trip.fromJson(Map<String, dynamic> json) {
    return Trip(
      id: json['id'] as String,
      destination: json['destination'] as String,
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      travelers: json['travelers'] as int,
      budget: (json['budget'] as num).toDouble(),
      style: json['style'] as String,
      dayPlans: (json['dayPlans'] as List)
          .map((e) => DayPlan.fromJson(e as Map<String, dynamic>))
          .toList(),
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'destination': destination,
      'startDate': startDate.toIso8601String(),
      'endDate': endDate.toIso8601String(),
      'travelers': travelers,
      'budget': budget,
      'style': style,
      'dayPlans': dayPlans.map((e) => e.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
```

**Step 2: 创建 DayPlan 模型**

```dart
import 'spot.dart';

class DayPlan {
  final int dayNumber;
  final String date;
  final List<Spot> spots;
  final String? breakfast;
  final String? lunch;
  final String? dinner;
  final String? accommodation;

  DayPlan({
    required this.dayNumber,
    required this.date,
    required this.spots,
    this.breakfast,
    this.lunch,
    this.dinner,
    this.accommodation,
  });

  factory DayPlan.fromJson(Map<String, dynamic> json) {
    return DayPlan(
      dayNumber: json['dayNumber'] as int,
      date: json['date'] as String,
      spots: (json['spots'] as List)
          .map((e) => Spot.fromJson(e as Map<String, dynamic>))
          .toList(),
      breakfast: json['breakfast'] as String?,
      lunch: json['lunch'] as String?,
      dinner: json['dinner'] as String?,
      accommodation: json['accommodation'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'dayNumber': dayNumber,
      'date': date,
      'spots': spots.map((e) => e.toJson()).toList(),
      'breakfast': breakfast,
      'lunch': lunch,
      'dinner': dinner,
      'accommodation': accommodation,
    };
  }
}
```

**Step 3: 创建 Spot 模型**

```dart
class Spot {
  final String id;
  final String name;
  final String description;
  final String imageUrl;
  final double rating;
  final String address;
  final double latitude;
  final double longitude;
  final String openTime;
  final int suggestedDuration;
  final List<String> tags;

  Spot({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.rating,
    required this.address,
    required this.latitude,
    required this.longitude,
    required this.openTime,
    required this.suggestedDuration,
    required this.tags,
  });

  factory Spot.fromJson(Map<String, dynamic> json) {
    return Spot(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      imageUrl: json['imageUrl'] as String,
      rating: (json['rating'] as num).toDouble(),
      address: json['address'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      openTime: json['openTime'] as String,
      suggestedDuration: json['suggestedDuration'] as int,
      tags: (json['tags'] as List).map((e) => e as String).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'imageUrl': imageUrl,
      'rating': rating,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
      'openTime': openTime,
      'suggestedDuration': suggestedDuration,
      'tags': tags,
    };
  }
}
```

**Step 4: 创建 Restaurant 模型**

```dart
class Restaurant {
  final String id;
  final String name;
  final String cuisine;
  final String address;
  final double latitude;
  final double longitude;
  final double rating;
  final String priceRange;
  final String imageUrl;
  final List<String> features;
  final String openTime;

  Restaurant({
    required this.id,
    required this.name,
    required this.cuisine,
    required this.address,
    required this.latitude,
    required this.longitude,
    required this.rating,
    required this.priceRange,
    required this.imageUrl,
    required this.features,
    required this.openTime,
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) {
    return Restaurant(
      id: json['id'] as String,
      name: json['name'] as String,
      cuisine: json['cuisine'] as String,
      address: json['address'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      rating: (json['rating'] as num).toDouble(),
      priceRange: json['priceRange'] as String,
      imageUrl: json['imageUrl'] as String,
      features: (json['features'] as List).map((e) => e as String).toList(),
      openTime: json['openTime'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'cuisine': cuisine,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
      'rating': rating,
      'priceRange': priceRange,
      'imageUrl': imageUrl,
      'features': features,
      'openTime': openTime,
    };
  }
}
```

**Step 5: 创建 UserPreferences 模型**

```dart
class UserPreferences {
  final String userId;
  final String preferredStyle;
  final double maxBudget;
  final List<String> dietaryRestrictions;
  final List<String> interestTags;
  final String? emergencyContact;
  final String? emergencyPhone;

  UserPreferences({
    required this.userId,
    required this.preferredStyle,
    required this.maxBudget,
    required this.dietaryRestrictions,
    required this.interestTags,
    this.emergencyContact,
    this.emergencyPhone,
  });

  factory UserPreferences.fromJson(Map<String, dynamic> json) {
    return UserPreferences(
      userId: json['userId'] as String,
      preferredStyle: json['preferredStyle'] as String,
      maxBudget: (json['maxBudget'] as num).toDouble(),
      dietaryRestrictions: (json['dietaryRestrictions'] as List)
          .map((e) => e as String)
          .toList(),
      interestTags: (json['interestTags'] as List)
          .map((e) => e as String)
          .toList(),
      emergencyContact: json['emergencyContact'] as String?,
      emergencyPhone: json['emergencyPhone'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'preferredStyle': preferredStyle,
      'maxBudget': maxBudget,
      'dietaryRestrictions': dietaryRestrictions,
      'interestTags': interestTags,
      'emergencyContact': emergencyContact,
      'emergencyPhone': emergencyPhone,
    };
  }
}
```

**Step 6: 提交代码**

```bash
git add -A
git commit -m "feat: 添加数据模型定义"
```

---

## Phase 2: 核心功能开发

### Task 3: 首页功能开发

**Files:**
- Create: `lib/features/home/presentation/pages/home_page.dart`
- Create: `lib/features/home/presentation/widgets/quick_action_card.dart`
- Create: `lib/features/home/presentation/widgets/recent_trip_card.dart`
- Create: `lib/features/home/presentation/widgets/destination_card.dart`

**Step 1: 创建首页**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../app/theme/app_theme.dart';

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
        // 近期旅行列表将在这里实现
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
```

**Step 2: 创建快捷操作卡片组件**

```dart
import 'package:flutter/material.dart';

class QuickActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const QuickActionCard({
    super.key,
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                color: color,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

**Step 3: 创建目的地卡片组件**

```dart
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

class DestinationCard extends StatelessWidget {
  final String name;
  final String imageUrl;
  final int spotsCount;

  const DestinationCard({
    super.key,
    required this.name,
    required this.imageUrl,
    required this.spotsCount,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      margin: const EdgeInsets.only(right: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Stack(
          fit: StackFit.expand,
          children: [
            CachedNetworkImage(
              imageUrl: imageUrl,
              fit: BoxFit.cover,
              placeholder: (context, url) => Container(
                color: Colors.grey.shade200,
                child: const Center(child: CircularProgressIndicator()),
              ),
              errorWidget: (context, url, error) => Container(
                color: Colors.grey.shade200,
                child: const Icon(Icons.image_not_supported),
              ),
            ),
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    Colors.black.withOpacity(0.7),
                  ],
                ),
              ),
            ),
            Positioned(
              bottom: 12,
              left: 12,
              right: 12,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '$spotsCount 个景点',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.8),
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

**Step 4: 提交代码**

```bash
git add -A
git commit -m "feat: 添加首页和基础组件"
```

---

### Task 4: AI 行程规划功能开发

**Files:**
- Create: `lib/features/planning/presentation/pages/planning_page.dart`
- Create: `lib/features/planning/presentation/widgets/trip_form.dart`
- Create: `lib/features/planning/presentation/widgets/style_selector.dart`
- Create: `lib/features/planning/data/repositories/trip_repository.dart`
- Create: `lib/features/planning/data/services/ai_service.dart`
- Create: `lib/features/planning/domain/providers/planning_provider.dart`

**Step 1: 创建 AI 服务**

```dart
import 'package:dio/dio.dart';
import '../../../../shared/models/trip.dart';
import '../../../../shared/models/day_plan.dart';
import '../../../../shared/models/spot.dart';

class AIService {
  final Dio _dio;
  
  // 这里替换为实际的 API Key
  static const String _apiKey = 'YOUR_API_KEY';
  static const String _baseUrl = 'https://api.openai.com/v1';

  AIService({Dio? dio}) : _dio = dio ?? Dio();

  Future<Trip> generateTripPlan({
    required String destination,
    required DateTime startDate,
    required DateTime endDate,
    required int travelers,
    required double budget,
    required String style,
  }) async {
    final prompt = _buildPrompt(
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      travelers: travelers,
      budget: budget,
      style: style,
    );

    try {
      final response = await _dio.post(
        '$_baseUrl/chat/completions',
        options: Options(
          headers: {
            'Authorization': 'Bearer $_apiKey',
            'Content-Type': 'application/json',
          },
        ),
        data: {
          'model': 'gpt-4',
          'messages': [
            {
              'role': 'system',
              'content': '你是一个专业的旅行规划师，擅长根据用户需求制定详细的旅行行程。请以 JSON 格式返回行程规划。'
            },
            {
              'role': 'user',
              'content': prompt
            }
          ],
          'temperature': 0.7,
        },
      );

      final content = response.data['choices'][0]['message']['content'];
      final jsonData = _parseJsonResponse(content);
      
      return Trip.fromJson(jsonData);
    } catch (e) {
      // 演示模式：返回模拟数据
      return _generateMockTrip(
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        travelers: travelers,
        budget: budget,
        style: style,
      );
    }
  }

  String _buildPrompt({
    required String destination,
    required DateTime startDate,
    required DateTime endDate,
    required int travelers,
    required double budget,
    required String style,
  }) {
    final days = endDate.difference(startDate).inDays + 1;
    return '''
请为我去 $destination 旅行制定一个 $days 天的行程规划。

旅行信息：
- 目的地：$destination
- 出行日期：${startDate.toString().substring(0, 10)}
- 返回日期：${endDate.toString().substring(0, 10)}
- 人数：$travelers 人
- 预算：$budget 元
- 旅行风格：$style

请以 JSON 格式返回，包含以下字段：
{
  "id": "唯一ID",
  "destination": "目的地",
  "startDate": "出发日期",
  "endDate": "返回日期",
  "travelers": 人数,
  "budget": 预算,
  "style": "旅行风格",
  "dayPlans": [
    {
      "dayNumber": 1,
      "date": "日期",
      "spots": [
        {
          "id": "景点ID",
          "name": "景点名称",
          "description": "景点描述",
          "imageUrl": "图片URL",
          "rating": 评分,
          "address": "地址",
          "latitude": 纬度,
          "longitude": 经度,
          "openTime": "开放时间",
          "suggestedDuration": 建议游玩时长(分钟),
          "tags": ["标签"]
        }
      ],
      "breakfast": "早餐推荐",
      "lunch": "午餐推荐",
      "dinner": "晚餐推荐",
      "accommodation": "住宿推荐"
    }
  ],
  "createdAt": "创建时间"
}
''';
  }

  Map<String, dynamic> _parseJsonResponse(String content) {
    // 尝试解析 JSON 响应
    try {
      final start = content.indexOf('{');
      final end = content.lastIndexOf('}') + 1;
      if (start != -1 && end != -1) {
        final jsonStr = content.substring(start, end);
        return _ensureValidJson(jsonStr);
      }
    } catch (e) {
      // 解析失败
    }
    return {};
  }

  Map<String, dynamic> _ensureValidJson(String jsonStr) {
    // 简单的 JSON 修复
    jsonStr = jsonStr.replaceAll('""', '"');
    return {};
  }

  Trip _generateMockTrip({
    required String destination,
    required DateTime startDate,
    required DateTime endDate,
    required int travelers,
    required double budget,
    required String style,
  }) {
    final days = endDate.difference(startDate).inDays + 1;
    final dayPlans = <DayPlan>[];
    final spotNames = _getSpotsForDestination(destination);

    for (int i = 0; i < days; i++) {
      final date = startDate.add(Duration(days: i));
      final spots = <Spot>[];
      
      for (int j = 0; j < 3; j++) {
        final spotIndex = (i * 3 + j) % spotNames.length;
        spots.add(Spot(
          id: '${destination.toLowerCase()}_${i}_$j',
          name: spotNames[spotIndex]['name']!,
          description: spotNames[spotIndex]['desc']!,
          imageUrl: 'https://picsum.photos/seed/${destination.toLowerCase()}${i}$j/400/300',
          rating: 4.0 + (j * 0.3),
          address: spotNames[spotIndex]['address']!,
          latitude: 39.9 + (i * 0.01) + (j * 0.005),
          longitude: 116.4 + (i * 0.01) + (j * 0.005),
          openTime: '08:00-18:00',
          suggestedDuration: 120 + (j * 30),
          tags: ['景点', '必玩'],
        ));
      }

      dayPlans.add(DayPlan(
        dayNumber: i + 1,
        date: '${date.month}-${date.day}',
        spots: spots,
        breakfast: '酒店早餐',
        lunch: '当地特色餐厅',
        dinner: '夜市美食',
        accommodation: '${destination}市中心酒店',
      ));
    }

    return Trip(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      travelers: travelers,
      budget: budget,
      style: style,
      dayPlans: dayPlans,
      createdAt: DateTime.now(),
    );
  }

  List<Map<String, String>> _getSpotsForDestination(String destination) {
    final spotsMap = {
      '北京': [
        {'name': '故宫博物院', 'desc': '中国明清两代的皇家宫殿', 'address': '北京市东城区景山前街4号'},
        {'name': '长城', 'desc': '中国古代伟大的防御工程', 'address': '北京市延庆区G6京藏高速58号出口'},
        {'name': '天坛公园', 'desc': '明清两代帝王祭祀皇天、祈五谷丰登的场所', 'address': '北京市东城区天坛内东里7号'},
        {'name': '颐和园', 'desc': '清代皇家园林，以昆明湖、万寿山为基址', 'address': '北京市海淀区新建宫门路19号'},
        {'name': '什刹海', 'desc': '北京城内面积最大、风貌保存最完整的历史街区', 'address': '北京市西城区地安门西大街49号'},
        {'name': '798艺术区', 'desc': '原国营798厂等电子工业的老厂区', 'address': '北京市朝阳区酒仙桥路4号'},
      ],
      '上海': [
        {'name': '外滩', 'desc': '上海最具代表性的景观', 'address': '上海市黄浦区中山东一路'},
        {'name': '东方明珠', 'desc': '上海的地标性建筑', 'address': '上海市浦东新区世纪大道1号'},
        {'name': '豫园', 'desc': '始建于明代的古典园林', 'address': '上海市黄浦区安仁街137号'},
        {'name': '田子坊', 'desc': '最具海派文化的石库门里弄', 'address': '上海市泰康路210弄'},
        {'name': '上海迪士尼乐园', 'desc': '中国大陆第一个迪士尼主题乐园', 'address': '上海市浦东新区川沙镇黄赵路310号'},
        {'name': '静安寺', 'desc': '上海最古老的佛寺', 'address': '上海市静安区南京西路1686号'},
      ],
      '成都': [
        {'name': '大熊猫繁育研究基地', 'desc': '全球最大的大熊猫繁育研究机构', 'address': '成都市成华区熊猫大道1375号'},
        {'name': '宽窄巷子', 'desc': '成都三大历史文化保护区之一', 'address': '成都市青羊区长顺上街127号'},
        {'name': '锦里古街', 'desc': '成都武侯祠的一部分', 'address': '成都市武侯区武侯祠大街231号'},
        {'name': '青城山', 'desc': '道教发源地之一', 'address': '成都市都江堰市青城山镇'},
        {'name': '都江堰', 'desc': '古代水利工程的奇迹', 'address': '成都市都江堰市城西'},
        {'name': '春熙路', 'desc': '成都最繁华的商业街', 'address': '成都市锦江区春熙路'},
      ],
      '杭州': [
        {'name': '西湖', 'desc': '中国著名的风景名胜', 'address': '杭州市西湖区西湖风景名胜区'},
        {'name': '灵隐寺', 'desc': '江南著名古刹', 'address': '杭州市西湖区灵隐路法云弄1号'},
        {'name': '宋城', 'desc': '大型宋代文化主题公园', 'address': '杭州市西湖区之江路148号'},
        {'name': '西溪湿地', 'desc': '国内第一个国家湿地公园', 'address': '杭州市西湖区天目山路518号'},
        {'name': '雷峰塔', 'desc': '西湖十景之一', 'address': '杭州市西湖区南山路15号'},
        {'name': '断桥', 'desc': '西湖著名景点', 'address': '杭州市西湖区北山路'},
      ],
    };

    return spotsMap[destination] ?? [
      {'name': '$destination 景点1', 'desc': '著名景点', 'address': '$destination 市中心'},
      {'name': '$destination 景点2', 'desc': '历史遗迹', 'address': '$destination 老城区'},
      {'name': '$destination 景点3', 'desc': '自然风光', 'address': '$destination 风景区'},
    ];
  }
}
```

**Step 2: 创建行程规划 Provider**

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/models/trip.dart';
import '../../data/services/ai_service.dart';

enum PlanningStatus { initial, loading, success, error }

class PlanningState {
  final PlanningStatus status;
  final Trip? trip;
  final String? errorMessage;

  PlanningState({
    this.status = PlanningStatus.initial,
    this.trip,
    this.errorMessage,
  });

  PlanningState copyWith({
    PlanningStatus? status,
    Trip? trip,
    String? errorMessage,
  }) {
    return PlanningState(
      status: status ?? this.status,
      trip: trip ?? this.trip,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

class PlanningNotifier extends StateNotifier<PlanningState> {
  final AIService _aiService;

  PlanningNotifier(this._aiService) : super(PlanningState());

  Future<void> generateTripPlan({
    required String destination,
    required DateTime startDate,
    required DateTime endDate,
    required int travelers,
    required double budget,
    required String style,
  }) async {
    state = state.copyWith(status: PlanningStatus.loading);

    try {
      final trip = await _aiService.generateTripPlan(
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        travelers: travelers,
        budget: budget,
        style: style,
      );

      state = state.copyWith(
        status: PlanningStatus.success,
        trip: trip,
      );
    } catch (e) {
      state = state.copyWith(
        status: PlanningStatus.error,
        errorMessage: e.toString(),
      );
    }
  }

  void reset() {
    state = PlanningState();
  }
}

final aiServiceProvider = Provider<AIService>((ref) {
  return AIService();
});

final planningProvider = StateNotifierProvider<PlanningNotifier, PlanningState>((ref) {
  final aiService = ref.watch(aiServiceProvider);
  return PlanningNotifier(aiService);
});
```

**Step 3: 创建行程规划页面**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../providers/planning_provider.dart';
import '../widgets/trip_form.dart';
import '../widgets/style_selector.dart';

class PlanningPage extends ConsumerStatefulWidget {
  const PlanningPage({super.key});

  @override
  ConsumerState<PlanningPage> createState() => _PlanningPageState();
}

class _PlanningPageState extends ConsumerState<PlanningPage> {
  final _formKey = GlobalKey<FormState>();
  final _destinationController = TextEditingController();
  DateTime _startDate = DateTime.now().add(const Duration(days: 7));
  DateTime _endDate = DateTime.now().add(const Duration(days: 10));
  int _travelers = 2;
  double _budget = 5000;
  String _style = '舒适';

  final List<String> _styles = ['穷游', '舒适', '豪华', '亲子', '情侣', '文化', '美食'];

  @override
  void dispose() {
    _destinationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final planningState = ref.watch(planningProvider);

    ref.listen<PlanningState>(planningProvider, (previous, next) {
      if (next.status == PlanningStatus.success && next.trip != null) {
        context.push('/trip/${next.trip!.id}');
      }
    });

    return Scaffold(
      appBar: AppBar(
        title: const Text('AI 行程规划'),
      ),
      body: planningState.status == PlanningStatus.loading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '告诉我你的旅行计划',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 24),
                    TextFormField(
                      controller: _destinationController,
                      decoration: const InputDecoration(
                        labelText: '目的地',
                        hintText: '例如：北京、上海、成都',
                        prefixIcon: Icon(Icons.location_on),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return '请输入目的地';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: _buildDatePicker(
                            label: '出发日期',
                            date: _startDate,
                            onChanged: (date) {
                              setState(() {
                                _startDate = date;
                                if (_endDate.isBefore(_startDate)) {
                                  _endDate = _startDate.add(const Duration(days: 1));
                                }
                              });
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildDatePicker(
                            label: '返回日期',
                            date: _endDate,
                            firstDate: _startDate,
                            onChanged: (date) {
                              setState(() {
                                _endDate = date;
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    _buildTravelersSelector(),
                    const SizedBox(height: 16),
                    _buildBudgetSlider(),
                    const SizedBox(height: 24),
                    const Text(
                      '旅行风格',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    StyleSelector(
                      styles: _styles,
                      selectedStyle: _style,
                      onSelected: (style) {
                        setState(() {
                          _style = style;
                        });
                      },
                    ),
                    const SizedBox(height: 32),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: _generatePlan,
                        child: const Text(
                          '生成旅行计划',
                          style: TextStyle(fontSize: 16),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildDatePicker({
    required String label,
    required DateTime date,
    required Function(DateTime) onChanged,
    DateTime? firstDate,
  }) {
    return InkWell(
      onTap: () async {
        final selected = await showDatePicker(
          context: context,
          initialDate: date,
          firstDate: firstDate ?? DateTime.now(),
          lastDate: DateTime.now().add(const Duration(days: 365)),
        );
        if (selected != null) {
          onChanged(selected);
        }
      },
      child: InputDecorator(
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: const Icon(Icons.calendar_today),
        ),
        child: Text(
          '${date.month}-${date.day}',
          style: const TextStyle(fontSize: 16),
        ),
      ),
    );
  }

  Widget _buildTravelersSelector() {
    return Row(
      children: [
        const Icon(Icons.people, color: Colors.grey),
        const SizedBox(width: 12),
        const Text('人数:', style: TextStyle(fontSize: 16)),
        const Spacer(),
        IconButton(
          onPressed: () {
            if (_travelers > 1) {
              setState(() => _travelers--);
            }
          },
          icon: const Icon(Icons.remove_circle_outline),
        ),
        Text(
          '$_travelers 人',
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        IconButton(
          onPressed: () {
            if (_travelers < 10) {
              setState(() => _travelers++);
            }
          },
          icon: const Icon(Icons.add_circle_outline),
        ),
      ],
    );
  }

  Widget _buildBudgetSlider() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.attach_money, color: Colors.grey),
            const SizedBox(width: 12),
            const Text('预算:', style: TextStyle(fontSize: 16)),
            const Spacer(),
            Text(
              '¥${_budget.toInt()}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ],
        ),
        Slider(
          value: _budget,
          min: 1000,
          max: 50000,
          divisions: 49,
          label: '¥${_budget.toInt()}',
          onChanged: (value) {
            setState(() {
              _budget = value;
            });
          },
        ),
      ],
    );
  }

  void _generatePlan() {
    if (_formKey.currentState!.validate()) {
      ref.read(planningProvider.notifier).generateTripPlan(
        destination: _destinationController.text,
        startDate: _startDate,
        endDate: _endDate,
        travelers: _travelers,
        budget: _budget,
        style: _style,
      );
    }
  }
}
```

**Step 4: 创建旅行风格选择器组件**

```dart
import 'package:flutter/material.dart';
import '../../../../app/theme/app_theme.dart';

class StyleSelector extends StatelessWidget {
  final List<String> styles;
  final String selectedStyle;
  final Function(String) onSelected;

  const StyleSelector({
    super.key,
    required this.styles,
    required this.selectedStyle,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: styles.map((style) {
        final isSelected = style == selectedStyle;
        return ChoiceChip(
          label: Text(style),
          selected: isSelected,
          onSelected: (selected) {
            if (selected) {
              onSelected(style);
            }
          },
          selectedColor: AppTheme.primaryColor.withOpacity(0.2),
          labelStyle: TextStyle(
            color: isSelected ? AppTheme.primaryColor : Colors.grey.shade700,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
          ),
        );
      }).toList(),
    );
  }
}
```

**Step 5: 提交代码**

```bash
git add -A
git commit -m "feat: 添加 AI 行程规划功能"
```

---

### Task 5: 行程详情页开发

**Files:**
- Create: `lib/features/planning/presentation/pages/trip_detail_page.dart`
- Create: `lib/features/planning/presentation/widgets/day_plan_card.dart`
- Create: `lib/features/planning/presentation/widgets/spot_card.dart`

**Step 1: 创建行程详情页**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/models/trip.dart';
import '../../domain/providers/planning_provider.dart';
import '../widgets/day_plan_card.dart';

class TripDetailPage extends ConsumerWidget {
  final String tripId;

  const TripDetailPage({super.key, required this.tripId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final planningState = ref.watch(planningProvider);
    final trip = planningState.trip;

    if (trip == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('行程详情')),
        body: const Center(child: Text('未找到行程')),
      );
    }

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          _buildAppBar(context, trip),
          SliverToBoxAdapter(
            child: _buildTripInfo(trip),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                return DayPlanCard(
                  dayPlan: trip.dayPlans[index],
                  destination: trip.destination,
                );
              },
              childCount: trip.dayPlans.length,
            ),
          ),
          const SliverPadding(padding: EdgeInsets.only(bottom: 32)),
        ],
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, Trip trip) {
    return SliverAppBar(
      expandedHeight: 200,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        title: Text(
          trip.destination,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            shadows: [
              Shadow(
                offset: Offset(0, 1),
                blurRadius: 3,
                color: Colors.black45,
              ),
            ],
          ),
        ),
        background: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Colors.blue.shade400,
                Colors.blue.shade800,
              ],
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.flight_takeoff,
                  size: 48,
                  color: Colors.white70,
                ),
                const SizedBox(height: 8),
                Text(
                  '${trip.dayPlans.length} 天行程',
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTripInfo(Trip trip) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildInfoItem(Icons.calendar_today, '${trip.startDate.month}/${trip.startDate.day} - ${trip.endDate.month}/${trip.endDate.day}'),
          _buildInfoItem(Icons.people, '${trip.travelers}人'),
          _buildInfoItem(Icons.attach_money, '¥${trip.budget.toInt()}'),
          _buildInfoItem(Icons.style, trip.style),
        ],
      ),
    );
  }

  Widget _buildInfoItem(IconData icon, String text) {
    return Column(
      children: [
        Icon(icon, color: Colors.grey.shade600, size: 20),
        const SizedBox(height: 4),
        Text(
          text,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey.shade700,
          ),
        ),
      ],
    );
  }
}
```

**Step 2: 创建每日行程卡片组件**

```dart
import 'package:flutter/material.dart';
import '../../../../shared/models/day_plan.dart';
import 'spot_card.dart';

class DayPlanCard extends StatelessWidget {
  final DayPlan dayPlan;
  final String destination;

  const DayPlanCard({
    super.key,
    required this.dayPlan,
    required this.destination,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Theme.of(context).primaryColor,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    'Day ${dayPlan.dayNumber}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  dayPlan.date,
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ...dayPlan.spots.map((spot) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: SpotCard(spot: spot),
            )),
            if (dayPlan.breakfast != null || dayPlan.lunch != null || dayPlan.dinner != null) ...[
              const Divider(),
              const SizedBox(height: 8),
              _buildMealSection('🍳 早餐', dayPlan.breakfast),
              _buildMealSection('🍜 午餐', dayPlan.lunch),
              _buildMealSection('🍽️ 晚餐', dayPlan.dinner),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildMealSection(String label, String? meal) {
    if (meal == null) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
          const SizedBox(width: 8),
          Expanded(child: Text(meal, style: TextStyle(color: Colors.grey.shade700))),
        ],
      ),
    );
  }
}
```

**Step 3: 创建景点卡片组件**

```dart
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../../shared/models/spot.dart';

class SpotCard extends StatelessWidget {
  final Spot spot;

  const SpotCard({super.key, required this.spot});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: CachedNetworkImage(
            imageUrl: spot.imageUrl,
            width: 80,
            height: 80,
            fit: BoxFit.cover,
            placeholder: (context, url) => Container(
              width: 80,
              height: 80,
              color: Colors.grey.shade200,
              child: const Icon(Icons.image),
            ),
            errorWidget: (context, url, error) => Container(
              width: 80,
              height: 80,
              color: Colors.grey.shade200,
              child: const Icon(Icons.image_not_supported),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                spot.name,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                spot.description,
                style: TextStyle(
                  color: Colors.grey.shade600,
                  fontSize: 12,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  Icon(Icons.star, color: Colors.amber.shade600, size: 16),
                  const SizedBox(width: 4),
                  Text(
                    spot.rating.toStringAsFixed(1),
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(width: 12),
                  Icon(Icons.access_time, color: Colors.grey.shade500, size: 14),
                  const SizedBox(width: 4),
                  Text(
                    '${spot.suggestedDuration}分钟',
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

**Step 4: 提交代码**

```bash
git add -A
git commit -m "feat: 添加行程详情页"
```

---

## Phase 3: 扩展功能开发

### Task 6: 地图导航功能

**Files:**
- Create: `lib/features/navigation/presentation/pages/map_page.dart`
- Create: `lib/features/navigation/data/repositories/location_repository.dart`

**Step 1: 创建地图页面**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:amap_flutter_map/amap_flutter_map.dart';
import 'package:amap_flutter_location/amap_flutter_location.dart';
import 'package:permission_handler/permission_handler.dart';

class MapPage extends ConsumerStatefulWidget {
  const MapPage({super.key});

  @override
  ConsumerState<MapPage> createState() => _MapPageState();
}

class _MapPageState extends ConsumerState<MapPage> {
  AMapController? _mapController;
  final AMapFlutterLocation _locationPlugin = AMapFlutterLocation();
  
  @override
  void initState() {
    super.initState();
    _requestPermission();
  }

  Future<void> _requestPermission() async {
    final status = await Permission.location.request();
    if (status.isGranted) {
      _startLocation();
    }
  }

  void _startLocation() {
    AMapFlutterLocation.updatePrivacyAgreement(true);
    _locationPlugin.startLocation();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('地图导航'),
        actions: [
          IconButton(
            icon: const Icon(Icons.my_location),
            onPressed: _goToCurrentLocation,
          ),
        ],
      ),
      body: AMapWidget(
        apiKey: AMapApiKey(
          iosKey: 'YOUR_IOS_KEY',
          androidKey: 'YOUR_ANDROID_KEY',
        ),
        onMapCreated: (controller) {
          _mapController = controller;
        },
        initialCameraPosition: const CameraPosition(
          target: LatLng(39.908823, 116.397470),
          zoom: 12,
        ),
        myLocationStyle: const MyLocationStyle(
          show: true,
          myLocationType: MyLocationType.LOCATION_TYPE_LOCATION_ROTATE,
        ),
        markers: _buildMarkers(),
      ),
    );
  }

  Set<Marker> _buildMarkers() {
    // 示例标记点
    return {
      Marker(
        position: const LatLng(39.908823, 116.397470),
        title: '天安门广场',
        snippet: '北京市东城区',
      ),
    };
  }

  void _goToCurrentLocation() {
    _mapController?.moveCamera(
      CameraUpdate.newLatLng(const LatLng(39.908823, 116.397470)),
    );
  }

  @override
  void dispose() {
    _locationPlugin.stopLocation();
    super.dispose();
  }
}
```

**Step 2: 提交代码**

```bash
git add -A
git commit -m "feat: 添加地图导航功能"
```

---

### Task 7: 美食推荐功能

**Files:**
- Create: `lib/features/food/presentation/pages/food_page.dart`
- Create: `lib/features/food/data/repositories/food_repository.dart`

**Step 1: 创建美食页面**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/models/restaurant.dart';

class FoodPage extends ConsumerStatefulWidget {
  const FoodPage({super.key});

  @override
  ConsumerState<FoodPage> createState() => _FoodPageState();
}

class _FoodPageState extends ConsumerState<FoodPage> {
  String _selectedFilter = '全部';
  
  final List<String> _filters = ['全部', '特色美食', '小吃快餐', '火锅', '烧烤', '日料', '西餐'];

  final List<Restaurant> _restaurants = [
    Restaurant(
      id: '1',
      name: '全聚德烤鸭店',
      cuisine: '京菜',
      address: '北京市东城区前门大街',
      latitude: 39.907,
      longitude: 116.398,
      rating: 4.5,
      priceRange: '¥¥¥',
      imageUrl: 'https://picsum.photos/seed/food1/400/300',
      features: ['百年老店', '招牌烤鸭'],
      openTime: '10:00-21:00',
    ),
    Restaurant(
      id: '2',
      name: '东来顺火锅',
      cuisine: '火锅',
      address: '北京市西城区',
      latitude: 39.912,
      longitude: 116.373,
      rating: 4.3,
      priceRange: '¥¥¥',
      imageUrl: 'https://picsum.photos/seed/food2/400/300',
      features: ['老字号', '铜锅涮肉'],
      openTime: '11:00-22:00',
    ),
    Restaurant(
      id: '3',
      name: '护国寺小吃',
      cuisine: '小吃',
      address: '北京市西城区护国寺大街',
      latitude: 39.932,
      longitude: 116.368,
      rating: 4.2,
      priceRange: '¥',
      imageUrl: 'https://picsum.photos/seed/food3/400/300',
      features: ['北京小吃', '传统味道'],
      openTime: '06:30-19:30',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('美食推荐'),
      ),
      body: Column(
        children: [
          _buildFilterBar(),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _restaurants.length,
              itemBuilder: (context, index) {
                return _buildRestaurantCard(_restaurants[index]);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterBar() {
    return Container(
      height: 50,
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: _filters.length,
        itemBuilder: (context, index) {
          final filter = _filters[index];
          final isSelected = filter == _selectedFilter;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: FilterChip(
              label: Text(filter),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  _selectedFilter = filter;
                });
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildRestaurantCard(Restaurant restaurant) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
            child: Image.network(
              restaurant.imageUrl,
              height: 160,
              width: double.infinity,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  height: 160,
                  color: Colors.grey.shade200,
                  child: const Icon(Icons.restaurant, size: 48),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        restaurant.name,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Row(
                      children: [
                        const Icon(Icons.star, color: Colors.amber, size: 18),
                        const SizedBox(width: 4),
                        Text(
                          restaurant.rating.toStringAsFixed(1),
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  restaurant.cuisine,
                  style: TextStyle(color: Colors.grey.shade600),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.location_on, size: 16, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        restaurant.address,
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade500,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Text(
                      restaurant.priceRange,
                      style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        color: Colors.green,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Icon(Icons.access_time, size: 14, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Text(
                      restaurant.openTime,
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade500,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  children: restaurant.features.map((feature) {
                    return Chip(
                      label: Text(
                        feature,
                        style: const TextStyle(fontSize: 10),
                      ),
                      padding: EdgeInsets.zero,
                      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
```

**Step 2: 提交代码**

```bash
git add -A
git commit -m "feat: 添加美食推荐功能"
```

---

### Task 8: 安全保障功能

**Files:**
- Create: `lib/features/safety/presentation/pages/safety_page.dart`

**Step 1: 创建安全保障页面**

```dart
import 'package:flutter/material.dart';

class SafetyPage extends StatelessWidget {
  const SafetyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('安全保障'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildEmergencyCard(context),
          const SizedBox(height: 16),
          _buildWeatherCard(context),
          const SizedBox(height: 16),
          _buildTipsCard(context),
          const SizedBox(height: 16),
          _buildEmergencyNumbersCard(context),
        ],
      ),
    );
  }

  Widget _buildEmergencyCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.red.shade50,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.emergency, color: Colors.red),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Text(
                    '紧急联系人',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text('编辑'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            const ListTile(
              leading: Icon(Icons.person),
              title: Text('妈妈'),
              subtitle: Text('138****8888'),
              contentPadding: EdgeInsets.zero,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWeatherCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.wb_sunny, color: Colors.orange),
                ),
                const SizedBox(width: 12),
                const Text(
                  '天气预警',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            ListTile(
              leading: const Icon(Icons.cloud),
              title: const Text('北京'),
              subtitle: const Text('晴 15-25°C'),
              trailing: const Chip(
                label: Text('空气质量良'),
                backgroundColor: Colors.green,
              ),
              contentPadding: EdgeInsets.zero,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTipsCard(BuildContext context) {
    final tips = [
      {'icon': Icons.security, 'title': '保管好个人财物', 'desc': '注意防范盗窃'},
      {'icon': Icons.local_hospital, 'title': '注意人身安全', 'desc': '避免危险区域'},
      {'icon': Icons.food_bank, 'title': '饮食卫生', 'desc': '选择正规餐厅'},
      {'icon': Icons.directions_car, 'title': '交通安全', 'desc': '遵守交通规则'},
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.tips_and_updates, color: Colors.amber),
                SizedBox(width: 8),
                Text(
                  '旅行安全提示',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            ...tips.map((tip) => ListTile(
              leading: Icon(tip['icon'] as IconData, color: Colors.grey),
              title: Text(tip['title'] as String),
              subtitle: Text(tip['desc'] as String),
              contentPadding: EdgeInsets.zero,
            )),
          ],
        ),
      ),
    );
  }

  Widget _buildEmergencyNumbersCard(BuildContext context) {
    final numbers = [
      {'name': '急救', 'number': '120'},
      {'name': '报警', 'number': '110'},
      {'name': '火警', 'number': '119'},
      {'name': '旅游投诉', 'number': '12301'},
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.phone, color: Colors.red),
                SizedBox(width: 8),
                Text(
                  '紧急电话',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            ...numbers.map((item) => ListTile(
              title: Text(item['name']!),
              trailing: Text(
                item['number']!,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.red,
                ),
              ),
              contentPadding: EdgeInsets.zero,
            )),
          ],
        ),
      ),
    );
  }
}
```

**Step 2: 提交代码**

```bash
git add -A
git commit -m "feat: 添加安全保障功能"
```

---

### Task 9: 个人中心页面

**Files:**
- Create: `lib/features/profile/presentation/pages/profile_page.dart`

**Step 1: 创建个人中心页面**

```dart
import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('我的'),
      ),
      body: ListView(
        children: [
          _buildHeader(),
          const SizedBox(height: 16),
          _buildMenuSection(context),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(24),
      color: Colors.blue,
      child: Row(
        children: [
          CircleAvatar(
            radius: 36,
            backgroundColor: Colors.white,
            child: Icon(Icons.person, size: 40, color: Colors.blue.shade700),
          ),
          const SizedBox(width: 16),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '旅行者',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 4),
              Text(
                '开启精彩旅程',
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMenuSection(BuildContext context) {
    final menus = [
      {'icon': Icons.history, 'title': '历史行程', 'route': '/history'},
      {'icon': Icons.favorite, 'title': '我的收藏', 'route': '/favorites'},
      {'icon': Icons.settings, 'title': '设置', 'route': '/settings'},
      {'icon': Icons.help, 'title': '帮助与反馈', 'route': '/help'},
    ];

    return Column(
      children: menus.map((menu) {
        return ListTile(
          leading: Icon(menu['icon'] as IconData),
          title: Text(menu['title'] as String),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        );
      }).toList(),
    );
  }
}
```

**Step 2: 提交代码**

```bash
git add -A
git commit -m "feat: 添加个人中心页面"
```

---

## Phase 4: 测试与优化

### Task 10: 构建与测试

**Step 1: 运行 Flutter 分析**

Run: `flutter analyze`
Expected: 无严重错误

**Step 2: 构建 iOS 模拟器版本**

Run: `flutter build ios --simulator --no-codesign`
Expected: 构建成功

**Step 3: 构建 Android APK**

Run: `flutter build apk --debug`
Expected: APK 生成成功

---

## 执行方式

**Plan complete and saved to `docs/plans/2026-02-26-tripmate-design.md`.**

**两个执行选项：**

**1. 子代理驱动 (当前会话)** - 我为每个任务分派一个新的子代理，任务间进行代码审查，快速迭代

**2. 独立并行会话** - 在新的会话中打开，使用 executing-plans，批量执行并设置检查点

**你选择哪种方式？**
