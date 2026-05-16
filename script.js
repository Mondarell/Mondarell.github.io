// 主 Vue 应用
const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
    setup() {
        // 响应式数据
        const currentView = ref('overview');
        const currentRole = ref('farmer');
        const showNotifications = ref(false);
        const showAllTasks = ref(false);
        const unreadAlerts = ref(3);
        const selectedMetric = ref('moisture');
        const mapView = ref('map');
        const isLoading = ref(false);
        const connectedSensors = ref(24);
        const totalSensors = ref(30);
        
        // 分析数据
        const analyticsPeriod = ref('30d');
        const analyticsMetric = ref('yield');
        const analyticsCrop = ref('all');
        
        // 报告数据
        const selectedReportType = ref('monthly');
        const reportStartDate = ref('2024-01-01');
        const currentReport = ref(null);
        
        // 系统配置
        const config = ref({
            syncInterval: '15',
            retentionPeriod: '90',
            twoFactor: true,
            sessionTimeout: '30',
            passwordPolicy: 'medium'
        });
        
        // 模拟数据
        const soilData = ref({
            averageMoisture: 68,
            averageTemperature: 22,
            pH: 6.8
        });
        
        const weatherAlerts = ref({
            critical: [
                { id: 1, title: 'Frost Warning', description: 'Temperature may drop below 0°C tonight' }
            ],
            warnings: [
                { id: 2, title: 'Strong Wind Alert', description: 'Expect 6-7 level winds tomorrow' },
                { id: 3, title: 'Rain Alert', description: 'Thunderstorm expected in next 3 hours' }
            ]
        });
        
        const weatherForecast = ref([
            { time: 'Now', icon: 'fas fa-sun', temp: 24 },
            { time: '15:00', icon: 'fas fa-cloud-sun', temp: 23 },
            { time: '18:00', icon: 'fas fa-cloud', temp: 20 },
            { time: '21:00', icon: 'fas fa-cloud-rain', temp: 18 },
            { time: '00:00', icon: 'fas fa-cloud-moon', temp: 16 },
            { time: '03:00', icon: 'fas fa-temperature-low', temp: 12 },
            { time: '06:00', icon: 'fas fa-temperature-low', temp: 10 }
        ]);
        
        const tasks = ref([
            { id: 1, title: 'Irrigate Field A3', field: 'Field A3', time: 'This Afternoon', priority: 'high', completed: false },
            { id: 2, title: 'Check Disease in B7', field: 'Field B7', time: 'Today', priority: 'high', completed: false },
            { id: 3, title: 'Add Fertilizer', field: 'Field C2', time: 'Tomorrow', priority: 'normal', completed: true },
            { id: 4, title: 'Prune Fruit Trees', field: 'Orchard Area', time: 'This Week', priority: 'normal', completed: false },
            { id: 5, title: 'Check Irrigation System', field: 'All Areas', time: 'Tomorrow', priority: 'normal', completed: false }
        ]);
        
        const supplyData = ref({
            inTransit: 8,
            storageUtilization: 75,
            recentShipments: [
                { id: 1, destination: 'Beijing Market', status: 'in-transit', statusText: 'In Transit', eta: 'Today 18:00' },
                { id: 2, destination: 'Shanghai Warehouse', status: 'delivered', statusText: 'Delivered', eta: 'Yesterday 15:30' },
                { id: 3, destination: 'Guangzhou Distribution', status: 'pending', statusText: 'Pending', eta: 'Tomorrow 10:00' }
            ]
        });
        
        const farmFields = ref([
            { id: 1, name: 'Field A3', area: 12.5, crop: 'Wheat', plantingDate: '2023-10-15', moisture: 72, temperature: 21, health: 95, status: 'normal', statusText: 'Normal' },
            { id: 2, name: 'Field B7', area: 8.3, crop: 'Corn', plantingDate: '2023-11-05', moisture: 45, temperature: 23, health: 68, status: 'critical', statusText: 'Needs Irrigation' },
            { id: 3, name: 'Field C2', area: 15.2, crop: 'Rice', plantingDate: '2023-09-20', moisture: 85, temperature: 19, health: 92, status: 'normal', statusText: 'Normal' },
            { id: 4, name: 'Field D5', area: 6.7, crop: 'Soybean', plantingDate: '2023-10-30', moisture: 60, temperature: 22, health: 78, status: 'warning', statusText: 'Needs Attention' },
            { id: 5, name: 'Field E1', area: 10.8, crop: 'Wheat', plantingDate: '2023-10-10', moisture: 70, temperature: 20, health: 88, status: 'normal', statusText: 'Normal' },
            { id: 6, name: 'Field F4', area: 9.5, crop: 'Corn', plantingDate: '2023-11-08', moisture: 50, temperature: 24, health: 72, status: 'warning', statusText: 'Needs Attention' }
        ]);
        
        const notifications = ref([
            { id: 1, title: 'Field B7 Moisture Too Low', time: '10 minutes ago', type: 'critical', icon: 'fas fa-exclamation-triangle', read: false },
            { id: 2, title: 'Field A3 Irrigation Complete', time: '1 hour ago', type: 'info', icon: 'fas fa-check-circle', read: true },
            { id: 3, title: 'Weather Forecast Updated', time: '2 hours ago', type: 'warning', icon: 'fas fa-cloud-rain', read: false },
            { id: 4, title: 'Sensor X01 Offline', time: '3 hours ago', type: 'warning', icon: 'fas fa-microchip', read: false },
            { id: 5, title: 'New Farming Suggestion', time: '5 hours ago', type: 'info', icon: 'fas fa-lightbulb', read: true }
        ]);
        
        const realTimeAlerts = ref([
            { id: 1, message: 'Temperature Sensor T07 Data Abnormal', time: 'Just now', level: 'critical', icon: 'fas fa-exclamation-triangle' },
            { id: 2, message: 'Irrigation System Field A3 Task Complete', time: '2 minutes ago', level: 'info', icon: 'fas fa-check-circle' },
            { id: 3, message: 'Field B7 Soil Moisture Below Threshold', time: '15 minutes ago', level: 'warning', icon: 'fas fa-tint' },
            { id: 4, message: 'Weather Station Connection Normal', time: '30 minutes ago', level: 'info', icon: 'fas fa-cloud-sun' }
        ]);
        
        const systemMessages = ref([
            { id: 1, text: 'Agricultural expert visiting tomorrow for guidance', sender: 'Cooperative Manager', time: 'Today 09:30', avatar: 'fas fa-user-tie' },
            { id: 2, text: 'New soil test report published', sender: 'Agronomist Zhang', time: 'Today 08:15', avatar: 'fas fa-user-md' },
            { id: 3, text: 'Monthly irrigation plan updated', sender: 'System Auto', time: 'Yesterday 16:45', avatar: 'fas fa-robot' }
        ]);
        
        const farmingSuggestions = ref([
            { id: 1, title: 'Adjust Irrigation Time', description: 'Recommend adjusting Field A3 irrigation to after 4 PM', icon: 'fas fa-tint' },
            { id: 2, title: 'Add Micronutrients', description: 'Zinc deficiency detected in Field B7, recommend zinc fertilizer', icon: 'fas fa-flask' },
            { id: 3, title: 'Pest Prevention', description: 'High humidity recently, recommend preventive spraying', icon: 'fas fa-bug' }
        ]);
        
        // 传感器数据
        const sensors = ref([
            { id: 1, name: 'Soil Moisture A3', type: 'Soil Sensor', location: 'Field A3', value: 72, unit: '%', status: 'online', icon: 'fas fa-tint', lastUpdate: '2 min ago' },
            { id: 2, name: 'Temperature B7', type: 'Temperature Sensor', location: 'Field B7', value: 23, unit: '°C', status: 'online', icon: 'fas fa-thermometer-half', lastUpdate: '5 min ago' },
            { id: 3, name: 'Humidity C2', type: 'Humidity Sensor', location: 'Field C2', value: 65, unit: '%', status: 'warning', icon: 'fas fa-tint', lastUpdate: '10 min ago' },
            { id: 4, name: 'pH Sensor D5', type: 'pH Sensor', location: 'Field D5', value: 6.8, unit: 'pH', status: 'online', icon: 'fas fa-flask', lastUpdate: '15 min ago' },
            { id: 5, name: 'Light Sensor E1', type: 'Light Sensor', location: 'Field E1', value: 850, unit: 'lux', status: 'online', icon: 'fas fa-sun', lastUpdate: '3 min ago' },
            { id: 6, name: 'Wind Speed F4', type: 'Anemometer', location: 'Field F4', value: 3.2, unit: 'm/s', status: 'offline', icon: 'fas fa-wind', lastUpdate: '1 hour ago' },
            { id: 7, name: 'Rain Gauge Main', type: 'Rain Sensor', location: 'Weather Station', value: 0, unit: 'mm', status: 'online', icon: 'fas fa-cloud-rain', lastUpdate: '5 min ago' },
            { id: 8, name: 'Soil Temp G7', type: 'Soil Temperature', location: 'Field G7', value: 19, unit: '°C', status: 'online', icon: 'fas fa-thermometer', lastUpdate: '8 min ago' }
        ]);
        
        // 灌溉数据
        const irrigationZones = ref([
            { id: 1, name: 'Zone A - Wheat Field', currentMoisture: 72, targetMoisture: 70, nextIrrigation: 'Today 18:00', irrigationLevel: 70, status: 'idle', statusText: 'Idle' },
            { id: 2, name: 'Zone B - Corn Field', currentMoisture: 45, targetMoisture: 60, nextIrrigation: 'ASAP', irrigationLevel: 90, status: 'critical', statusText: 'Critical' },
            { id: 3, name: 'Zone C - Rice Field', currentMoisture: 85, targetMoisture: 80, nextIrrigation: 'Tomorrow 06:00', irrigationLevel: 40, status: 'normal', statusText: 'Normal' },
            { id: 4, name: 'Zone D - Vegetables', currentMoisture: 60, targetMoisture: 65, nextIrrigation: 'Today 20:00', irrigationLevel: 60, status: 'warning', statusText: 'Needs Check' }
        ]);
        
        const irrigationSchedule = ref([
            { id: 1, zone: 'Zone A - Wheat', time: '06:00', days: 'Mon, Wed, Fri', duration: 30, waterUsage: 1200, status: 'active', statusText: 'Active' },
            { id: 2, zone: 'Zone B - Corn', time: '18:00', days: 'Daily', duration: 45, waterUsage: 1800, status: 'pending', statusText: 'Pending' },
            { id: 3, zone: 'Zone C - Rice', time: '12:00', days: 'Tue, Thu, Sat', duration: 60, waterUsage: 2400, status: 'active', statusText: 'Active' },
            { id: 4, zone: 'Zone D - Vegetables', time: '08:00', days: 'Daily', duration: 20, waterUsage: 800, status: 'completed', statusText: 'Completed' }
        ]);
        
        // 供应链数据
        const supplyStats = ref({
            inTransit: 8,
            inventory: 1250,
            pending: 12,
            completed: 45
        });
        
        const recentOrders = ref([
            { id: 1001, customer: 'Green Mart', product: 'Organic Wheat', quantity: 50, status: 'processing', statusText: 'Processing', deliveryDate: '2024-01-20' },
            { id: 1002, customer: 'Fresh Foods Co', product: 'Corn', quantity: 30, status: 'shipped', statusText: 'Shipped', deliveryDate: '2024-01-18' },
            { id: 1003, customer: 'Healthy Living', product: 'Rice', quantity: 25, status: 'delivered', statusText: 'Delivered', deliveryDate: '2024-01-15' },
            { id: 1004, customer: 'Local Market', product: 'Soybeans', quantity: 15, status: 'pending', statusText: 'Pending', deliveryDate: '2024-01-25' },
            { id: 1005, customer: 'Export Corp', product: 'Wheat', quantity: 100, status: 'processing', statusText: 'Processing', deliveryDate: '2024-01-30' }
        ]);
        
        // 分析数据
        const analyticsInsights = ref([
            { id: 1, title: 'Water Usage Efficiency Improved', description: 'Smart irrigation reduced water consumption by 23% compared to last month', impact: 'Save approx. 12,000L water monthly', type: 'positive', icon: 'fas fa-tint' },
            { id: 2, title: 'Fertilizer Optimization Opportunity', description: 'Field B7 shows excess nitrogen levels, consider reducing fertilizer application', impact: 'Potential 15% cost reduction', type: 'warning', icon: 'fas fa-flask' },
            { id: 3, title: 'Yield Prediction Increase', description: 'Based on current growth data, expected yield increased by 8% for wheat fields', impact: 'Additional 4.2 tons expected', type: 'positive', icon: 'fas fa-chart-line' }
        ]);
        
        // 报告数据
        const reportHistory = ref([
            { id: 1, name: 'Monthly Report - Jan 2024', type: 'Monthly', period: 'Jan 1-31, 2024', generated: '2024-02-01', size: '2.4 MB' },
            { id: 2, name: 'Weekly Report - Week 3', type: 'Weekly', period: 'Jan 15-21, 2024', generated: '2024-01-22', size: '1.1 MB' },
            { id: 3, name: 'Annual Report 2023', type: 'Annual', period: 'Jan-Dec 2023', generated: '2024-01-05', size: '8.7 MB' },
            { id: 4, name: 'Daily Report - Jan 20', type: 'Daily', period: 'Jan 20, 2024', generated: '2024-01-21', size: '0.8 MB' }
        ]);
        
        // 计算属性
        const filteredTasks = computed(() => {
            return showAllTasks.value ? tasks.value : tasks.value.slice(0, 3);
        });
        
        const taskCompletion = computed(() => {
            const completed = tasks.value.filter(task => task.completed).length;
            return Math.round((completed / tasks.value.length) * 100);
        });
        
        const lastUpdate = computed(() => {
            return new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        });
        
        // 图表实例
        let soilChart = null;
        let trendChart = null;
        let cropHealthChart = null;
        let farmMap = null;
        let sensorHistoryChart = null;
        let performanceChart = null;
        let costChart = null;
        let waterChart = null;
        let yieldChart = null;
        
        // 方法
        const switchRole = () => {
            // 根据角色切换视图
            if (currentRole.value === 'farmer') {
                if (currentView.value === 'analytics' || currentView.value === 'reports' || currentView.value === 'system') {
                    currentView.value = 'overview';
                }
            } else if (currentRole.value === 'manager') {
                if (currentView.value === 'system') {
                    currentView.value = 'overview';
                }
            }
            // 管理员可以访问所有视图
        };
        
        const changeView = (view) => {
            currentView.value = view;
            // 初始化视图特定的图表
            setTimeout(() => {
                if (view === 'sensors') {
                    initSensorChart();
                } else if (view === 'analytics') {
                    initAnalyticsCharts();
                }
            }, 100);
        };
        
        const selectField = (field) => {
            alert(`Selected: ${field.name}\nCrop: ${field.crop}\nArea: ${field.area} acres\nHealth: ${field.health}%`);
        };
        
        const markAllAsRead = () => {
            notifications.value.forEach(notification => {
                notification.read = true;
            });
            unreadAlerts.value = 0;
        };
        
        const toggleMapView = () => {
            mapView.value = mapView.value === 'map' ? 'satellite' : 'map';
        };
        
        const refreshData = () => {
            isLoading.value = true;
            // 模拟数据刷新
            setTimeout(() => {
                // 更新一些随机数据
                soilData.value.averageMoisture = 65 + Math.floor(Math.random() * 10);
                soilData.value.averageTemperature = 20 + Math.floor(Math.random() * 5);
                connectedSensors.value = 20 + Math.floor(Math.random() * 11);
                
                // 更新传感器数据
                sensors.value.forEach(sensor => {
                    if (sensor.status !== 'offline') {
                        if (sensor.type.includes('Moisture')) {
                            sensor.value = 50 + Math.floor(Math.random() * 40);
                        } else if (sensor.type.includes('Temperature')) {
                            sensor.value = 18 + Math.floor(Math.random() * 10);
                        }
                        sensor.lastUpdate = 'Just now';
                    }
                });
                
                // 添加一个模拟的新通知
                const newAlert = {
                    id: notifications.value.length + 1,
                    title: 'System Data Updated',
                    time: 'Just now',
                    type: 'info',
                    icon: 'fas fa-sync-alt',
                    read: false
                };
                notifications.value.unshift(newAlert);
                unreadAlerts.value++;
                
                // 更新实时警报
                const newRealTimeAlert = {
                    id: realTimeAlerts.value.length + 1,
                    message: 'System data refresh completed',
                    time: 'Just now',
                    level: 'info',
                    icon: 'fas fa-check-circle'
                };
                realTimeAlerts.value.unshift(newRealTimeAlert);
                
                // 重新渲染图表
                initCharts();
                if (currentView.value === 'sensors') initSensorChart();
                if (currentView.value === 'analytics') initAnalyticsCharts();
                
                isLoading.value = false;
            }, 1500);
        };
        
        const exportData = () => {
            alert('Data export feature coming soon...');
        };
        
        const showSettings = () => {
            currentView.value = 'system';
        };
        
        const applySuggestion = (suggestion) => {
            alert(`Applied suggestion: ${suggestion.title}`);
        };
        
        const updateTrendChart = () => {
            if (!trendChart) return;
            
            const metricData = {
                moisture: {
                    title: 'Soil Moisture Trend (%)',
                    data: [65, 68, 70, 72, 68, 66, 65, 67, 69, 72, 73, 71],
                    color: '#3498db'
                },
                temperature: {
                    title: 'Temperature Trend (°C)',
                    data: [18, 20, 22, 24, 23, 21, 20, 19, 21, 23, 22, 20],
                    color: '#e74c3c'
                },
                rainfall: {
                    title: 'Rainfall Trend (mm)',
                    data: [0, 0, 5, 12, 8, 3, 0, 0, 2, 10, 15, 5],
                    color: '#2ecc71'
                }
            };
            
            const selected = metricData[selectedMetric.value];
            const option = {
                title: {
                    text: selected.title,
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'normal'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: selected.data,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: selected.color,
                        width: 3
                    },
                    itemStyle: {
                        color: selected.color
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: selected.color + '80'
                            }, {
                                offset: 1,
                                color: selected.color + '10'
                            }]
                        }
                    }
                }],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                }
            };
            
            trendChart.setOption(option);
        };
// 传感器相关方法
        const viewSensorDetails = (sensor) => {
            alert(`Sensor Details:\nName: ${sensor.name}\nType: ${sensor.type}\nLocation: ${sensor.location}\nStatus: ${sensor.status}\nLast Reading: ${sensor.value} ${sensor.unit}`);
        };
        
        const configureSensor = (sensor) => {
            alert(`Configure sensor: ${sensor.name}`);
        };
        
        const initSensorChart = () => {
            if (sensorHistoryChart) {
                sensorHistoryChart.dispose();
            }
            
            sensorHistoryChart = echarts.init(document.getElementById('sensorHistoryChart'));
            const option = {
                title: {
                    text: 'Sensor Data History (Last 24 Hours)',
                    left: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Soil Moisture', 'Temperature', 'Humidity'],
                    bottom: 0
                },
                xAxis: {
                    type: 'category',
                    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00']
                },
                yAxis: [
                    {
                        type: 'value',
                        name: 'Moisture (%) / Humidity (%)',
                        position: 'left'
                    },
                    {
                        type: 'value',
                        name: 'Temperature (°C)',
                        position: 'right'
                    }
                ],
                series: [
                    {
                        name: 'Soil Moisture',
                        type: 'line',
                        data: [65, 64, 68, 72, 70, 68, 65],
                        smooth: true,
                        lineStyle: {
                            color: '#3498db',
                            width: 3
                        }
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [18, 16, 20, 24, 23, 20, 19],
                        smooth: true,
                        lineStyle: {
                            color: '#e74c3c',
                            width: 3
                        }
                    },
                    {
                        name: 'Humidity',
                        type: 'line',
                        data: [70, 72, 68, 60, 62, 65, 68],
                        smooth: true,
                        lineStyle: {
                            color: '#2ecc71',
                            width: 3
                        }
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: '15%',
                    containLabel: true
                }
            };
            
            sensorHistoryChart.setOption(option);
        };
        
        // 灌溉控制方法
        const startIrrigation = (zone) => {
            if (zone.status === 'active') return;
            
            zone.status = 'active';
            zone.statusText = 'Irrigating';
            alert(`Started irrigation for ${zone.name}`);
            
            // 模拟灌溉过程
            setTimeout(() => {
                zone.currentMoisture = Math.min(100, zone.currentMoisture + 15);
                zone.status = 'idle';
                zone.statusText = 'Completed';
                
                // 添加通知
                const newAlert = {
                    id: notifications.value.length + 1,
                    title: `Irrigation Complete: ${zone.name}`,
                    time: 'Just now',
                    type: 'info',
                    icon: 'fas fa-tint',
                    read: false
                };
                notifications.value.unshift(newAlert);
                unreadAlerts.value++;
            }, 3000);
        };
        
        const stopIrrigation = (zone) => {
            zone.status = 'idle';
            zone.statusText = 'Stopped';
            alert(`Stopped irrigation for ${zone.name}`);
        };
        
        const editSchedule = (schedule) => {
            alert(`Editing schedule for ${schedule.zone}`);
        };
        
        // 供应链方法
        const viewOrderDetails = (order) => {
            alert(`Order Details:\nID: #${order.id}\nCustomer: ${order.customer}\nProduct: ${order.product}\nQuantity: ${order.quantity} tons\nStatus: ${order.statusText}\nDelivery: ${order.deliveryDate}`);
        };
        
        // 分析方法
        const updateAnalytics = () => {
            alert(`Updating analytics with:\nPeriod: ${analyticsPeriod.value}\nMetric: ${analyticsMetric.value}\nCrop: ${analyticsCrop.value}`);
            initAnalyticsCharts();
        };
        
        const initAnalyticsCharts = () => {
            // 性能趋势图
            if (performanceChart) performanceChart.dispose();
            performanceChart = echarts.init(document.getElementById('performanceChart'));
            const performanceOption = {
                title: {
                    text: 'Performance Trends',
                    left: 'center',
                    textStyle: { fontSize: 16 }
                },
                tooltip: { trigger: 'axis' },
                legend: {
                    data: ['Yield (tons)', 'Water Usage (KL)', 'Efficiency (%)'],
                    bottom: 0
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
                },
                yAxis: [
                    {
                        type: 'value',
                        name: 'Yield (tons)',
                        position: 'left'
                    },
                    {
                        type: 'value',
                        name: 'Water Usage (KL) / Efficiency (%)',
                        position: 'right'
                    }
                ],
                series: [
                    {
                        name: 'Yield (tons)',
                        type: 'line',
                        data: [45, 52, 60, 58, 65, 63, 68],
                        smooth: true,
                        lineStyle: { color: '#2ecc71', width: 3 }
                    },
                    {
                        name: 'Water Usage (KL)',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [120, 115, 110, 105, 100, 98, 95],
                        smooth: true,
                        lineStyle: { color: '#3498db', width: 3 }
                    },
                    {
                        name: 'Efficiency (%)',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [75, 78, 82, 85, 88, 90, 92],
                        smooth: true,
                        lineStyle: { color: '#f1c40f', width: 3 }
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: '15%',
                    containLabel: true
                }
            };
            performanceChart.setOption(performanceOption);
            
            // 成本分布图
            if (costChart) costChart.dispose();
            costChart = echarts.init(document.getElementById('costChart'));
            const costOption = {
                title: {
                    text: 'Cost Distribution',
                    left: 'center',
                    textStyle: { fontSize: 16 }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 'center'
                },
                series: [
                    {
                        name: 'Cost Distribution',
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: 35, name: 'Labor', itemStyle: { color: '#3498db' } },
                            { value: 25, name: 'Fertilizer', itemStyle: { color: '#2ecc71' } },
                            { value: 20, name: 'Water', itemStyle: { color: '#9b59b6' } },
                            { value: 15, name: 'Equipment', itemStyle: { color: '#f1c40f' } },
                            { value: 5, name: 'Others', itemStyle: { color: '#e74c3c' } }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            costChart.setOption(costOption);
            
            // 用水效率图
            if (waterChart) waterChart.dispose();
            waterChart = echarts.init(document.getElementById('waterChart'));
            const waterOption = {
                title: {
                    text: 'Water Usage Efficiency',
                    left: 'center',
                    textStyle: { fontSize: 16 }
                },
                xAxis: {
                    type: 'category',
                    data: ['Wheat', 'Corn', 'Rice', 'Soybean', 'Vegetables']
                },
                yAxis: {
                    type: 'value',
                    name: 'Water (KL/ton)'
                },
                series: [
                    {
                        name: 'Water Usage',
                        type: 'bar',
                        data: [1.2, 1.5, 2.1, 1.0, 0.8],
                        itemStyle: {
                            color: function(params) {
                                const colors = ['#2ecc71', '#3498db', '#f1c40f', '#9b59b6', '#e74c3c'];
                                return colors[params.dataIndex % colors.length];
                            }
                        }
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '20%',
                    containLabel: true
                }
            };
            waterChart.setOption(waterOption);
            
            // 产量预测图
            if (yieldChart) yieldChart.dispose();
            yieldChart = echarts.init(document.getElementById('yieldChart'));
            const yieldOption = {
                title: {
                    text: 'Yield Prediction',
                    left: 'center',
                    textStyle: { fontSize: 16 }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: ['Current', 'Next Month', '2 Months', '3 Months']
                },
                yAxis: {
                    type: 'value',
                    name: 'Yield (tons)'
                },
                series: [
                    {
                        name: 'Predicted Yield',
                        type: 'line',
                        data: [65, 68, 72, 75],
                        smooth: true,
                        lineStyle: { color: '#2ecc71', width: 3 },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#2ecc7180' },
                                    { offset: 1, color: '#2ecc7110' }
                                ]
                            }
                        }
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '20%',
                    containLabel: true
                }
            };
            yieldChart.setOption(yieldOption);
        };
        
        // 报告方法
        const generateReport = () => {
            const reportTypes = {
                daily: { title: 'Daily Report', period: 'Day' },
                weekly: { title: 'Weekly Report', period: 'Week' },
                monthly: { title: 'Monthly Report', period: 'Month' },
                quarterly: { title: 'Quarterly Report', period: 'Quarter' },
                annual: { title: 'Annual Report', period: 'Year' }
            };
            
            const reportType = reportTypes[selectedReportType.value];
            currentReport.value = {
                title: `${reportType.title} - ${new Date().toLocaleDateString('en-US')}`,
                generatedDate: new Date().toLocaleString('en-US'),
                summary: `This ${reportType.period.toLowerCase()} report shows strong performance across all key metrics. Water efficiency improved by 5%, and yield increased by 8% compared to the previous ${reportType.period.toLowerCase()}.`,
                metrics: [
                    { name: 'Total Yield', value: '1,250 tons', trend: '+8%', trendClass: 'positive' },
                    { name: 'Water Saved', value: '12,500 L', trend: '+5%', trendClass: 'positive' },
                    { name: 'Efficiency', value: '92%', trend: '+3%', trendClass: 'positive' },
                    { name: 'Cost Saved', value: '$2,500', trend: '+7%', trendClass: 'positive' }
                ],
                recommendations: [
                    'Increase irrigation frequency for Zone B to improve moisture levels',
                    'Consider rotating crops in Field D5 to improve soil health',
                    'Schedule equipment maintenance for next month',
                    'Explore new fertilizer options for improved nutrient uptake'
                ]
            };
            
            // 添加到历史记录
            reportHistory.value.unshift({
                id: reportHistory.value.length + 1,
                name: currentReport.value.title,
                type: reportType.title,
                period: new Date().toLocaleDateString('en-US'),
                generated: 'Just now',
                size: '1.2 MB'
            });
            
            // 初始化报告图表
            setTimeout(() => {
                initReportCharts();
            }, 100);
        };
        
        const exportReport = () => {
            alert('Report exported successfully!');
        };
        
        const viewReport = (report) => {
            alert(`Viewing report: ${report.name}`);
        };
        
        const downloadReport = (report) => {
            alert(`Downloading report: ${report.name}`);
        };
        
        const initReportCharts = () => {
            if (!currentReport.value) return;
            
            // 报告图表1
            const chart1 = echarts.init(document.getElementById('reportChart1'));
            const option1 = {
                title: { text: 'Monthly Performance', left: 'center' },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },
                yAxis: { type: 'value', name: 'Yield (tons)' },
                series: [{
                    data: [120, 135, 145, 150, 165, 180],
                    type: 'bar',
                    itemStyle: { color: '#3498db' }
                }],
                grid: { left: '3%', right: '4%', bottom: '3%', top: '15%' }
            };
            chart1.setOption(option1);
            
            // 报告图表2
            const chart2 = echarts.init(document.getElementById('reportChart2'));
            const option2 = {
                title: { text: 'Cost Breakdown', left: 'center' },
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
                series: [{
                    name: 'Cost Breakdown',
                    type: 'pie',
                    radius: '70%',
                    data: [
                        { value: 40, name: 'Labor' },
                        { value: 25, name: 'Materials' },
                        { value: 20, name: 'Equipment' },
                        { value: 15, name: 'Utilities' }
                    ],
                    itemStyle: {
                        color: function(params) {
                            const colors = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'];
                            return colors[params.dataIndex % colors.length];
                        }
                    }
                }]
            };
            chart2.setOption(option2);
        };
        
        // 系统设置方法
        const manageUsers = () => {
            alert('User management interface coming soon...');
        };
        
        const configureNotifications = () => {
            alert('Notification configuration interface coming soon...');
        };
        
        const manageData = () => {
            alert('Data management interface coming soon...');
        };
        
        const saveConfig = () => {
            alert('Configuration saved successfully!');
        };
        
        // 初始化图表
        const initCharts = () => {
            // 初始化土壤图表
            if (soilChart) soilChart.dispose();
            soilChart = echarts.init(document.getElementById('soilChart'));
            const soilOption = {
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLine: { lineStyle: { color: '#ccc' } }
                },
                yAxis: {
                    type: 'value',
                    name: 'Moisture(%)',
                    axisLine: { lineStyle: { color: '#ccc' } }
                },
                series: [{
                    data: [65, 68, 70, 72, 68, 66, 65],
                    type: 'line',
                    smooth: true,
                    lineStyle: { color: '#3498db', width: 3 },
                    itemStyle: { color: '#3498db' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(52, 152, 219, 0.5)' },
                                { offset: 1, color: 'rgba(52, 152, 219, 0.1)' }
                            ]
                        }
                    }
                }],
                grid: { left: '3%', right: '4%', bottom: '3%', top: '3%' }
            };
            soilChart.setOption(soilOption);
            
            // 初始化趋势图表
            if (trendChart) trendChart.dispose();
            trendChart = echarts.init(document.getElementById('trendChart'));
            updateTrendChart();
            
            // 初始化作物健康图表
            if (cropHealthChart) cropHealthChart.dispose();
            cropHealthChart = echarts.init(document.getElementById('cropHealthChart'));
            const cropHealthOption = {
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c}%' },
                legend: { top: '5%', left: 'center' },
                series: [{
                    name: 'Crop Health',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
                    label: { show: false, position: 'center' },
                    emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
                    labelLine: { show: false },
                    data: [
                        { value: 45, name: 'Excellent', itemStyle: { color: '#2ecc71' } },
                        { value: 30, name: 'Good', itemStyle: { color: '#3498db' } },
                        { value: 15, name: 'Fair', itemStyle: { color: '#f1c40f' } },
                        { value: 10, name: 'Needs Attention', itemStyle: { color: '#e74c3c' } }
                    ]
                }]
            };
            cropHealthChart.setOption(cropHealthOption);
            
            // 初始化农场地图
            if (farmMap) farmMap.dispose();
            farmMap = echarts.init(document.getElementById('farmMap'));
            const farmMapOption = {
                title: { text: 'Field Distribution', left: 'center', textStyle: { fontSize: 16 } },
                tooltip: {
                    formatter: function(params) {
                        return params.name + '<br/>' + 
                               'Crop: ' + params.data.crop + '<br/>' +
                               'Area: ' + params.data.area + ' acres<br/>' +
                               'Health: ' + params.data.health + '%';
                    }
                },
                visualMap: {
                    min: 0, max: 100, left: 'left', top: 'bottom',
                    text: ['High', 'Low'], calculable: true,
                    orient: 'horizontal',
                    inRange: { color: ['#e74c3c', '#f1c40f', '#2ecc71'] }
                },
                series: [{
                    name: 'Fields',
                    type: 'map',
                    map: 'china',
                    roam: true, zoom: 1.5,
                    center: [113.5, 34.5], // Central China
                    label: { show: true },
                    data: [
                        { name: 'Field A3', value: 95, crop: 'Wheat', area: 12.5, health: 95 },
                        { name: 'Field B7', value: 68, crop: 'Corn', area: 8.3, health: 68 },
                        { name: 'Field C2', value: 92, crop: 'Rice', area: 15.2, health: 92 },
                        { name: 'Field D5', value: 78, crop: 'Soybean', area: 6.7, health: 78 },
                        { name: 'Field E1', value: 88, crop: 'Wheat', area: 10.8, health: 88 },
                        { name: 'Field F4', value: 72, crop: 'Corn', area: 9.5, health: 72 }
                    ],
                    itemStyle: { areaColor: '#f0f0f0', borderColor: '#ccc' },
                    emphasis: { itemStyle: { areaColor: '#a3e4d7' } }
                }]
            };
            farmMap.setOption(farmMapOption);
        };
        
        // 生命周期钩子
        onMounted(() => {
            // 初始化图表
            initCharts();
            
            // 监听窗口大小变化，重绘图表
            const handleResize = () => {
                if (soilChart) soilChart.resize();
                if (trendChart) trendChart.resize();
                if (cropHealthChart) cropHealthChart.resize();
                if (farmMap) farmMap.resize();
                if (sensorHistoryChart) sensorHistoryChart.resize();
                if (performanceChart) performanceChart.resize();
                if (costChart) costChart.resize();
                if (waterChart) waterChart.resize();
                if (yieldChart) yieldChart.resize();
            };
            
            window.addEventListener('resize', handleResize);
            
            // 模拟实时数据更新
            const dataUpdateInterval = setInterval(() => {
                // 随机更新一些数据
                const randomFieldIndex = Math.floor(Math.random() * farmFields.value.length);
                const change = Math.random() > 0.5 ? 1 : -1;
                const amount = Math.floor(Math.random() * 3);
                
                farmFields.value[randomFieldIndex].moisture += change * amount;
                farmFields.value[randomFieldIndex].moisture = Math.max(30, Math.min(90, farmFields.value[randomFieldIndex].moisture));
                
                // 更新健康度
                farmFields.value[randomFieldIndex].health = Math.max(
                    50, 
                    Math.min(100, farmFields.value[randomFieldIndex].health + (Math.random() > 0.7 ? 1 : -1))
                );
                
                // 更新状态文本
                const field = farmFields.value[randomFieldIndex];
                if (field.moisture < 50) {
                    field.status = 'critical';
                    field.statusText = 'Needs Irrigation';
                } else if (field.moisture < 60) {
                    field.status = 'warning';
                    field.statusText = 'Needs Attention';
                } else {
                    field.status = 'normal';
                    field.statusText = 'Normal';
                }
                
            }, 10000); // 每10秒更新一次
            
            onUnmounted(() => {
                // 清理
                window.removeEventListener('resize', handleResize);
                clearInterval(dataUpdateInterval);
                
                if (soilChart) soilChart.dispose();
                if (trendChart) trendChart.dispose();
                if (cropHealthChart) cropHealthChart.dispose();
                if (farmMap) farmMap.dispose();
                if (sensorHistoryChart) sensorHistoryChart.dispose();
                if (performanceChart) performanceChart.dispose();
                if (costChart) costChart.dispose();
                if (waterChart) waterChart.dispose();
                if (yieldChart) yieldChart.dispose();
            });
        });
        
        return {
            // 数据
            currentView,
            currentRole,
            showNotifications,
            showAllTasks,
            unreadAlerts,
            selectedMetric,
            mapView,
            isLoading,
            connectedSensors,
            totalSensors,
            analyticsPeriod,
            analyticsMetric,
            analyticsCrop,
            selectedReportType,
            reportStartDate,
            currentReport,
            config,
            soilData,
            weatherAlerts,
            weatherForecast,
            tasks,
            supplyData,
            farmFields,
            notifications,
            realTimeAlerts,
            systemMessages,
            farmingSuggestions,
            sensors,
            irrigationZones,
            irrigationSchedule,
            supplyStats,
            recentOrders,
            analyticsInsights,
            reportHistory,
            
            // 计算属性
            filteredTasks,
            taskCompletion,
            lastUpdate,
            
            // 方法
            switchRole,
            changeView,
            selectField,
            markAllAsRead,
            toggleMapView,
            refreshData,
            exportData,
            showSettings,
            applySuggestion,
            updateTrendChart,
            viewSensorDetails,
            configureSensor,
            startIrrigation,
            stopIrrigation,
            editSchedule,
            viewOrderDetails,
            updateAnalytics,
            generateReport,
            exportReport,
            viewReport,
            downloadReport,
            manageUsers,
            configureNotifications,
            manageData,
            saveConfig
        };
    }
}).mount('#app');