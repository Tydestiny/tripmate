import 'day_plan.dart';

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
