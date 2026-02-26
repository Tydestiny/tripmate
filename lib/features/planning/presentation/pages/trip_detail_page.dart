import 'package:flutter/material.dart';

class TripDetailPage extends StatelessWidget {
  final String tripId;

  const TripDetailPage({super.key, required this.tripId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('行程详情: $tripId'),
      ),
    );
  }
}
