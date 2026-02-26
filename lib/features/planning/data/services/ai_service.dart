import 'dart:math';
import '../../shared/models/trip.dart';
import '../../shared/models/day_plan.dart';
import '../../shared/models/spot.dart';

class AIService {
  static final Random _random = Random();

  static final List<String> _beijingSpots = [
    '故宫博物院', '天坛公园', '八达岭长城', '颐和园', '天安门广场',
    '圆明园', '北海公园', '景山公园', '鸟巢', '水立方',
  ];

  static final List<String> _shanghaiSpots = [
    '外滩', '东方明珠', '豫园', '田子坊', '上海迪士尼乐园',
    '南京路步行街', '静安寺', '世博园', '徐家汇商圈', '新天地',
  ];

  static final List<String> _hangzhouSpots = [
    '西湖', '灵隐寺', '宋城', '西溪湿地', '雷峰塔',
    '千岛湖', '清河坊', '龙井村', '六和塔', '岳王庙',
  ];

  static List<String> _getSpotsForDestination(String destination) {
    final d = destination.toLowerCase();
    if (d.contains('北京')) return _beijingSpots;
    if (d.contains('上海')) return _shanghaiSpots;
    if (d.contains('杭州')) return _hangzhouSpots;
    return [..._beijingSpots, ..._shanghaiSpots, ..._hangzhouSpots];
  }

  static Spot _createSpot(String name, int index) {
    return Spot(
      id: 'spot_${index}_${_random.nextInt(10000)}',
      name: name,
      description: '$name 是该地区的热门景点，风景优美，值得一游。',
      imageUrl: 'https://picsum.photos/seed/$index/400/300',
      rating: 4.0 + _random.nextDouble(),
      address: '北京市东城区东华门大街 $index 号',
      latitude: 39.9 + _random.nextDouble() * 0.1,
      longitude: 116.4 + _random.nextDouble() * 0.1,
      openTime: '09:00-18:00',
      suggestedDuration: 120 + _random.nextInt(120),
      tags: ['景点', '热门', '必玩'],
    );
  }

  static Future<Trip> generateTrip({
    required String destination,
    required DateTime startDate,
    required DateTime endDate,
    required int travelers,
    required double budget,
    required String style,
  }) async {
    await Future.delayed(const Duration(seconds: 2));

    final dayCount = endDate.difference(startDate).inDays + 1;
    final spots = _getSpotsForDestination(destination);
    
    final dayPlans = <DayPlan>[];
    for (int i = 0; i < dayCount; i++) {
      final dayDate = startDate.add(Duration(days: i));
      final daySpots = <Spot>[];
      
      final spotsForDay = (i * 3) % spots.length;
      for (int j = 0; j < 3; j++) {
        final spotIndex = (spotsForDay + j) % spots.length;
        daySpots.add(_createSpot(spots[spotIndex], i * 10 + j));
      }

      dayPlans.add(DayPlan(
        dayNumber: i + 1,
        date: '${dayDate.month}月${dayDate.day}日',
        spots: daySpots,
        breakfast: '酒店自助早餐',
        lunch: '特色午餐',
        dinner: '当地美食',
        accommodation: '${destination}市中心酒店',
      ));
    }

    return Trip(
      id: 'trip_${DateTime.now().millisecondsSinceEpoch}',
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
}
