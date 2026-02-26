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
