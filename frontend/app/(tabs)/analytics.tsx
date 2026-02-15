import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Sample data - replace with real data from your backend
    const weekData = [
        { day: 'Mon', calories: 1800, percentage: 75 },
        { day: 'Tue', calories: 2100, percentage: 88 },
        { day: 'Wed', calories: 1950, percentage: 81 },
        { day: 'Thu', calories: 2200, percentage: 92 },
        { day: 'Fri', calories: 1900, percentage: 79 },
        { day: 'Sat', calories: 2300, percentage: 96 },
        { day: 'Sun', calories: 2000, percentage: 83 },
    ];

    const macroData = [
        { name: 'Protein', value: 30, color: '#667eea', icon: 'barbell' as const },
        { name: 'Carbs', value: 45, color: '#764ba2', icon: 'leaf' as const },
        { name: 'Fats', value: 25, color: '#f093fb', icon: 'water' as const },
    ];

    const periods = [
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
        { key: 'year', label: 'Year' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.headerTitle}>Analytics</Text>
                <Text style={styles.headerSubtitle}>Track your nutrition journey</Text>
            </LinearGradient>

            {/* Period Selector */}
            <View style={styles.periodSelector}>
                {periods.map((period) => (
                    <TouchableOpacity
                        key={period.key}
                        style={[
                            styles.periodButton,
                            selectedPeriod === period.key && styles.periodButtonActive,
                        ]}
                        onPress={() => setSelectedPeriod(period.key)}
                    >
                        <Text
                            style={[
                                styles.periodButtonText,
                                selectedPeriod === period.key && styles.periodButtonTextActive,
                            ]}
                        >
                            {period.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <View style={styles.statIconContainer}>
                        <Ionicons name="flame" size={24} color="#667eea" />
                    </View>
                    <Text style={styles.statValue}>2,050</Text>
                    <Text style={styles.statLabel}>Avg Calories</Text>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statIconContainer}>
                        <Ionicons name="trending-up" size={24} color="#764ba2" />
                    </View>
                    <Text style={styles.statValue}>85%</Text>
                    <Text style={styles.statLabel}>Goal Progress</Text>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statIconContainer}>
                        <Ionicons name="restaurant" size={24} color="#f093fb" />
                    </View>
                    <Text style={styles.statValue}>42</Text>
                    <Text style={styles.statLabel}>Meals Logged</Text>
                </View>
            </View>

            {/* Calorie Trend Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Calorie Trend</Text>
                <View style={styles.barChartContainer}>
                    {weekData.map((item, index) => (
                        <View key={index} style={styles.barWrapper}>
                            <View style={styles.barContainer}>
                                <LinearGradient
                                    colors={['#667eea', '#764ba2']}
                                    style={[styles.bar, { height: `${item.percentage}%` }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                />
                            </View>
                            <Text style={styles.barLabel}>{item.day}</Text>
                            <Text style={styles.barValue}>{item.calories}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Macro Distribution */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Macro Distribution</Text>
                <View style={styles.macroContainer}>
                    {/* Circular Progress */}
                    <View style={styles.circularChart}>
                        <View style={styles.circularChartInner}>
                            <Text style={styles.circularChartValue}>100%</Text>
                            <Text style={styles.circularChartLabel}>Daily Goal</Text>
                        </View>
                    </View>

                    {/* Macro List */}
                    <View style={styles.macroList}>
                        {macroData.map((macro, index) => (
                            <View key={index} style={styles.macroItem}>
                                <View style={[styles.macroIcon, { backgroundColor: macro.color }]}>
                                    <Ionicons name={macro.icon} size={20} color="#fff" />
                                </View>
                                <View style={styles.macroInfo}>
                                    <Text style={styles.macroName}>{macro.name}</Text>
                                    <View style={styles.macroProgressBar}>
                                        <View
                                            style={[
                                                styles.macroProgressFill,
                                                { width: `${macro.value}%`, backgroundColor: macro.color },
                                            ]}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.macroValue}>{macro.value}%</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Weekly Summary */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                    <Ionicons name="calendar" size={24} color="#667eea" />
                    <Text style={styles.summaryTitle}>Weekly Summary</Text>
                </View>
                <View style={styles.summaryGrid}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>14,350</Text>
                        <Text style={styles.summaryLabel}>Total Calories</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>7/7</Text>
                        <Text style={styles.summaryLabel}>Days Tracked</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>21</Text>
                        <Text style={styles.summaryLabel}>Meals Logged</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>2.5L</Text>
                        <Text style={styles.summaryLabel}>Avg Water</Text>
                    </View>
                </View>
            </View>

            {/* Insights */}
            <View style={styles.insightsCard}>
                <Text style={styles.insightsTitle}>
                    <Ionicons name="bulb" size={20} color="#667eea" /> Insights
                </Text>
                <View style={styles.insightItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
                    <Text style={styles.insightText}>
                        You're consistently meeting your protein goals!
                    </Text>
                </View>
                <View style={styles.insightItem}>
                    <Ionicons name="alert-circle" size={20} color="#ff9800" />
                    <Text style={styles.insightText}>
                        Try to increase your water intake on weekends
                    </Text>
                </View>
                <View style={styles.insightItem}>
                    <Ionicons name="trending-up" size={20} color="#2196f3" />
                    <Text style={styles.insightText}>
                        Your calorie consistency has improved by 15% this month
                    </Text>
                </View>
            </View>

            <View style={styles.bottomPadding} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#ffffff',
        opacity: 0.9,
    },
    periodSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 20,
        marginHorizontal: 20,
    },
    periodButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    periodButtonActive: {
        backgroundColor: '#667eea',
        borderColor: '#667eea',
    },
    periodButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    periodButtonTextActive: {
        color: '#ffffff',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 20,
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    chartCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 20,
    },
    barChartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
        paddingTop: 20,
    },
    barWrapper: {
        flex: 1,
        alignItems: 'center',
        gap: 8,
    },
    barContainer: {
        width: '80%',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bar: {
        width: '100%',
        borderRadius: 8,
        minHeight: 20,
    },
    barLabel: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
    },
    barValue: {
        fontSize: 10,
        color: '#999',
    },
    macroContainer: {
        gap: 20,
    },
    circularChart: {
        alignSelf: 'center',
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 12,
        borderColor: '#667eea',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    circularChartInner: {
        alignItems: 'center',
    },
    circularChartValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    circularChartLabel: {
        fontSize: 12,
        color: '#666',
    },
    macroList: {
        gap: 15,
    },
    macroItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    macroIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    macroInfo: {
        flex: 1,
        gap: 6,
    },
    macroName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    macroProgressBar: {
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    macroProgressFill: {
        height: '100%',
        borderRadius: 3,
    },
    macroValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a1a',
        minWidth: 40,
        textAlign: 'right',
    },
    summaryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    summaryItem: {
        width: '47%',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    insightsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    insightsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 15,
    },
    insightItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 10,
    },
    insightText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    bottomPadding: {
        height: 120,
    },
});
