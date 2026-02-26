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
