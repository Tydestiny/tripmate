import 'package:flutter/material.dart';
import '../../../shared/models/restaurant.dart';

class FoodPage extends StatefulWidget {
  const FoodPage({super.key});

  @override
  State<FoodPage> createState() => _FoodPageState();
}

class _FoodPageState extends State<FoodPage> {
  String _selectedCategory = '全部';
  String _selectedPrice = '全部';
  String _sortBy = '评分';

  final List<String> _categories = ['全部', '中餐', '西餐', '日料', '火锅', '烧烤', '小吃'];
  final List<String> _priceRanges = ['全部', '¥', '¥¥', '¥¥¥', '¥¥¥¥'];

  final List<Restaurant> _restaurants = [
    Restaurant(
      id: '1',
      name: '全聚德烤鸭店',
      cuisine: '中餐',
      address: '北京市东城区前门大街大街14号',
      latitude: 39.9022,
      longitude: 116.4106,
      rating: 4.6,
      priceRange: '¥¥¥',
      imageUrl: 'https://picsum.photos/seed/rest1/400/300',
      features: ['老字号', '招牌烤鸭', '环境优雅'],
      openTime: '10:30-21:00',
    ),
    Restaurant(
      id: '2',
      name: '海底捞火锅',
      cuisine: '火锅',
      address: '北京市朝阳区建国路93号',
      latitude: 39.9163,
      longitude: 116.3972,
      rating: 4.5,
      priceRange: '¥¥¥',
      imageUrl: 'https://picsum.photos/seed/rest2/400/300',
      features: ['24小时', '服务好', '食材新鲜'],
      openTime: '24小时',
    ),
    Restaurant(
      id: '3',
      name: '壽司郎',
      cuisine: '日料',
      address: '北京市海淀区中关村大街15号',
      latitude: 39.9833,
      longitude: 116.3167,
      rating: 4.7,
      priceRange: '¥¥¥',
      imageUrl: 'https://picsum.photos/seed/rest3/400/300',
      features: ['新鲜食材', '回转寿司', '性价比高'],
      openTime: '11:00-22:00',
    ),
    Restaurant(
      id: '4',
      name: '绿茶餐厅',
      cuisine: '中餐',
      address: '北京市西城区金融街购物中心',
      latitude: 39.9153,
      longitude: 116.3606,
      rating: 4.3,
      priceRange: '¥¥',
      imageUrl: 'https://picsum.photos/seed/rest4/400/300',
      features: ['江浙菜', '环境好', '排队王'],
      openTime: '10:00-21:30',
    ),
    Restaurant(
      id: '5',
      name: '利群烧烤',
      cuisine: '烧烤',
      address: '北京市东城区簋街',
      latitude: 39.9422,
      longitude: 116.4272,
      rating: 4.4,
      priceRange: '¥¥',
      imageUrl: 'https://picsum.photos/seed/rest5/400/300',
      features: ['露天', '氛围好', '肉串大'],
      openTime: '17:00-02:00',
    ),
    Restaurant(
      id: '6',
      name: '必胜客',
      cuisine: '西餐',
      address: '北京市各区分店',
      latitude: 39.9088,
      longitude: 116.3975,
      rating: 4.2,
      priceRange: '¥¥',
      imageUrl: 'https://picsum.photos/seed/rest6/400/300',
      features: ['披萨', '意面', '儿童套餐'],
      openTime: '10:00-22:00',
    ),
  ];

  List<Restaurant> get _filteredRestaurants {
    return _restaurants.where((r) {
      if (_selectedCategory != '全部' && r.cuisine != _selectedCategory) {
        return false;
      }
      if (_selectedPrice != '全部') {
        final priceLength = r.priceRange.length;
        if (priceLength != _selectedPrice.length) return false;
      }
      return true;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('美食推荐'),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () => _showFilterSheet(context),
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            height: 50,
            color: Colors.white,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final category = _categories[index];
                final isSelected = _selectedCategory == category;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedCategory = category;
                      });
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? Theme.of(context).primaryColor
                            : Colors.grey[100],
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Center(
                        child: Text(
                          category,
                          style: TextStyle(
                            color: isSelected ? Colors.white : Colors.grey[700],
                            fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _filteredRestaurants.length,
              itemBuilder: (context, index) {
                return _RestaurantCard(
                  restaurant: _filteredRestaurants[index],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  void _showFilterSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        '筛选',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      TextButton(
                        onPressed: () {
                          setModalState(() {
                            _selectedPrice = '全部';
                            _sortBy = '评分';
                          });
                        },
                        child: const Text('重置'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text('价格', style: TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    children: _priceRanges.map((price) {
                      final isSelected = _selectedPrice == price;
                      return ChoiceChip(
                        label: Text(price),
                        selected: isSelected,
                        onSelected: (selected) {
                          setModalState(() {
                            _selectedPrice = price;
                          });
                        },
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 16),
                  const Text('排序', style: TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    children: ['评分', '距离', '价格'].map((sort) {
                      final isSelected = _sortBy == sort;
                      return ChoiceChip(
                        label: Text(sort),
                        selected: isSelected,
                        onSelected: (selected) {
                          setModalState(() {
                            _sortBy = sort;
                          });
                        },
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {});
                        Navigator.pop(context);
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Theme.of(context).primaryColor,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: const Text('应用筛选'),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }
}

class _RestaurantCard extends StatelessWidget {
  final Restaurant restaurant;

  const _RestaurantCard({required this.restaurant});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: Image.network(
              restaurant.imageUrl,
              height: 160,
              width: double.infinity,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  height: 160,
                  color: Colors.grey[200],
                  child: const Center(
                    child: Icon(Icons.restaurant, size: 48, color: Colors.grey),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
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
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.orange[50],
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.star, color: Colors.orange, size: 16),
                          const SizedBox(width: 2),
                          Text(
                            restaurant.rating.toStringAsFixed(1),
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.orange,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: Colors.blue[50],
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        restaurant.cuisine,
                        style: TextStyle(
                          color: Colors.blue[700],
                          fontSize: 12,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      restaurant.priceRange,
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 14,
                      ),
                    ),
                    const Spacer(),
                    Icon(Icons.access_time, size: 14, color: Colors.grey[500]),
                    const SizedBox(width: 4),
                    Text(
                      restaurant.openTime,
                      style: TextStyle(
                        color: Colors.grey[500],
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.location_on, size: 14, color: Colors.grey[400]),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        restaurant.address,
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontSize: 12,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 4,
                  children: restaurant.features.map((feature) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.grey[100],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        feature,
                        style: TextStyle(
                          fontSize: 11,
                          color: Colors.grey[600],
                        ),
                      ),
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
