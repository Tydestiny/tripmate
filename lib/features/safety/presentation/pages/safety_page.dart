import 'package:flutter/material.dart';

class SafetyPage extends StatefulWidget {
  const SafetyPage({super.key});

  @override
  State<SafetyPage> createState() => _SafetyPageState();
}

class _SafetyPageState extends State<SafetyPage> {
  final List<Map<String, dynamic>> _emergencyContacts = [
    {'name': '爸爸', 'phone': '138****1234', 'relation': '父亲'},
    {'name': '妈妈', 'phone': '139****5678', 'relation': '母亲'},
  ];

  final List<Map<String, dynamic>> _emergencyCalls = [
    {'name': '报警', 'phone': '110', 'icon': Icons.local_police, 'color': Colors.blue},
    {'name': '急救', 'phone': '120', 'icon': Icons.local_hospital, 'color': Colors.red},
    {'name': '火警', 'phone': '119', 'icon': Icons.fire_truck, 'color': Colors.orange},
    {'name': '旅游热线', 'phone': '12301', 'icon': Icons.phone, 'color': Colors.green},
  ];

  final List<Map<String, dynamic>> _safetyTips = [
    {'title': '保管好个人物品', 'content': '外出时随身携带贵重物品，不要将其放在显眼的位置', 'icon': Icons.backpack},
    {'title': '注意交通安全', 'content': '乘坐正规交通工具，过马路时注意红绿灯', 'icon': Icons.directions_bus},
    {'title': '防范诈骗', 'content': '不要轻信陌生人，遇到紧急情况及时报警', 'icon': Icons.security},
    {'title': '关注天气变化', 'content': '出行前查看目的地天气预报，做好相应准备', 'icon': Icons.cloud},
  ];

  final List<Map<String, dynamic>> _weatherAlerts = [
    {'type': '台风', 'level': '蓝色预警', 'area': '东南沿海地区', 'time': '今日18:00生效'},
    {'type': '暴雨', 'level': '黄色预警', 'area': '华南地区', 'time': '持续至明日'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('安全保障'),
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle('紧急联系人', Icons.contacts),
            const SizedBox(height: 12),
            _buildEmergencyContacts(),
            const SizedBox(height: 24),
            _buildSectionTitle('紧急电话', Icons.phone_in_talk),
            const SizedBox(height: 12),
            _buildEmergencyCalls(),
            const SizedBox(height: 24),
            _buildSectionTitle('天气预警', Icons.warning_amber),
            const SizedBox(height: 12),
            _buildWeatherAlerts(),
            const SizedBox(height: 24),
            _buildSectionTitle('旅行安全提示', Icons.tips_and_updates),
            const SizedBox(height: 12),
            _buildSafetyTips(),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title, IconData icon) {
    return Row(
      children: [
        Icon(icon, color: Theme.of(context).primaryColor),
        const SizedBox(width: 8),
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }

  Widget _buildEmergencyContacts() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          ..._emergencyContacts.map((contact) => ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).primaryColor.withOpacity(0.1),
              child: Icon(
                Icons.person,
                color: Theme.of(context).primaryColor,
              ),
            ),
            title: Text(contact['name']),
            subtitle: Text('${contact['relation']} • ${contact['phone']}'),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.phone, color: Colors.green),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('拨打 ${contact['phone']}')),
                    );
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.message, color: Colors.blue),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('发送短信')),
                    );
                  },
                ),
              ],
            ),
          )),
          ListTile(
            leading: CircleAvatar(
              backgroundColor: Colors.grey[100],
              child: const Icon(Icons.add, color: Colors.grey),
            ),
            title: const Text('添加紧急联系人'),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('添加联系人功能开发中')),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildEmergencyCalls() {
    return Row(
      children: _emergencyCalls.map((call) {
        return Expanded(
          child: GestureDetector(
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('拨打 ${call['phone']}')),
              );
            },
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 4),
              padding: const EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(
                color: call['color'].withOpacity(0.1),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: call['color'].withOpacity(0.3)),
              ),
              child: Column(
                children: [
                  Icon(call['icon'], color: call['color'], size: 32),
                  const SizedBox(height: 8),
                  Text(
                    call['name'],
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: call['color'],
                    ),
                  ),
                  Text(
                    call['phone'],
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildWeatherAlerts() {
    if (_weatherAlerts.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.green[50],
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.green, size: 32),
            const SizedBox(width: 12),
            const Expanded(
              child: Text(
                '当前目的地天气良好，无预警信息',
                style: TextStyle(color: Colors.green),
              ),
            ),
          ],
        ),
      );
    }

    return Column(
      children: _weatherAlerts.map((alert) {
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.orange[50],
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.orange[200]!),
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.orange[100],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(Icons.warning, color: Colors.orange[700]),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          alert['type'],
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.orange,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            alert['level'],
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${alert['area']} ${alert['time']}',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildSafetyTips() {
    return Column(
      children: _safetyTips.map((tip) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  tip['icon'],
                  color: Theme.of(context).primaryColor,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      tip['title'],
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      tip['content'],
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}
