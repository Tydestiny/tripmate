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
