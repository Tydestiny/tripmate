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
