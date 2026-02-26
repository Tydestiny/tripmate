import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app/routes/app_router.dart';
import 'app/theme/app_theme.dart';
import 'features/planning/domain/providers/planning_provider.dart';

final planningProvider = Provider<PlanningProvider>((ref) {
  return PlanningProvider();
});

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  runApp(
    ProviderScope(
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
