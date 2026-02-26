import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 200,
            pinned: true,
            backgroundColor: Theme.of(context).primaryColor,
            foregroundColor: Colors.white,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Theme.of(context).primaryColor,
                      Theme.of(context).primaryColor.withOpacity(0.7),
                    ],
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 40),
                    CircleAvatar(
                      radius: 40,
                      backgroundColor: Colors.white,
                      child: Icon(
                        Icons.person,
                        size: 40,
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      '旅行爱好者',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      '138****1234',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Column(
              children: [
                const SizedBox(height: 16),
                _buildStatsRow(),
                const SizedBox(height: 16),
                _buildMenuSection(context),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatsRow() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(vertical: 20),
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
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _StatItem(count: 12, label: '行程', icon: Icons.flight),
          _StatItem(count: 28, label: '收藏', icon: Icons.bookmark),
          _StatItem(count: 156, label: '足迹', icon: Icons.map),
        ],
      ),
    );
  }

  Widget _buildMenuSection(BuildContext context) {
    final menuGroups = [
      {
        'title': '我的订单',
        'items': [
          {'icon': Icons.confirmation_number, 'name': '我的订单', 'page': 'orders'},
          {'icon': Icons.wallet, 'name': '钱包', 'page': 'wallet'},
          {'icon': Icons.coupon, 'name': '优惠券', 'page': 'coupons'},
        ],
      },
      {
        'title': '常用设置',
        'items': [
          {'icon': Icons.person_outline, 'name': '个人信息', 'page': 'profile'},
          {'icon': Icons.notifications_outlined, 'name': '消息通知', 'page': 'notifications'},
          {'icon': Icons.security, 'name': '账号安全', 'page': 'security'},
        ],
      },
      {
        'title': '其他',
        'items': [
          {'icon': Icons.help_outline, 'name': '帮助中心', 'page': 'help'},
          {'icon': Icons.settings_outlined, 'name': '设置', 'page': 'settings'},
          {'icon': Icons.info_outline, 'name': '关于我们', 'page': 'about'},
        ],
      },
    ];

    return Column(
      children: menuGroups.map((group) {
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Text(
                  group['title'] as String,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[700],
                  ),
                ),
              ),
              ...(group['items'] as List).asMap().entries.map((entry) {
                final item = entry.value as Map<String, dynamic>;
                final isLast = entry.key == (group['items'] as List).length - 1;
                return Column(
                  children: [
                    ListTile(
                      leading: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Theme.of(context).primaryColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Icon(
                          item['icon'] as IconData,
                          color: Theme.of(context).primaryColor,
                          size: 20,
                        ),
                      ),
                      title: Text(item['name'] as String),
                      trailing: const Icon(
                        Icons.chevron_right,
                        color: Colors.grey,
                      ),
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('${item['name']}功能开发中')),
                        );
                      },
                    ),
                    if (!isLast)
                      Divider(
                        height: 1,
                        indent: 56,
                        color: Colors.grey[200],
                      ),
                  ],
                );
              }),
            ],
          ),
        );
      }).toList(),
    );
  }
}

class _StatItem extends StatelessWidget {
  final int count;
  final String label;
  final IconData icon;

  const _StatItem({
    required this.count,
    required this.label,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Theme.of(context).primaryColor),
        const SizedBox(height: 8),
        Text(
          count.toString(),
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.grey[600],
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}
