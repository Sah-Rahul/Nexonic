import   { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, MapPin, Calendar, CreditCard, ShoppingBag,   Search, Eye, RotateCcw, Star } from 'lucide-react';

const MyOrder = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Demo data - replace with your API data
  const orders = [
    {
      _id: "ORD-2024-7842",
      orderStatus: "Delivered",
      orderDate: "Nov 18, 2024",
      deliveryDate: "Nov 22, 2024",
      paymentMethod: "Credit Card",
      shippingAddress: "123 Main Street, Karachi",
      totalPrice: 15499,
      items: [
        { productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", title: "Wireless Headphones Pro", quantity: 1, price: 8999 },
        { productImage: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200", title: "Phone Case Premium", quantity: 2, price: 3250 }
      ]
    },
    {
      _id: "ORD-2024-7835",
      orderStatus: "Shipped",
      orderDate: "Nov 15, 2024",
      deliveryDate: "Nov 24, 2024",
      paymentMethod: "COD",
      shippingAddress: "456 Block B, Lahore",
      totalPrice: 24999,
      items: [
        { productImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200", title: "Smart Watch Series 5", quantity: 1, price: 24999 }
      ]
    },
    {
      _id: "ORD-2024-7820",
      orderStatus: "Processing",
      orderDate: "Nov 20, 2024",
      deliveryDate: "Nov 28, 2024",
      paymentMethod: "Debit Card",
      shippingAddress: "789 Garden Town, Islamabad",
      totalPrice: 5999,
      items: [
        { productImage: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200", title: "Bluetooth Speaker Mini", quantity: 1, price: 3499 },
        { productImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200", title: "Wireless Earbuds", quantity: 1, price: 2500 }
      ]
    }
  ];

  const getStatusConfig = (status:string) => {
    const configs = {
      'Delivered': { color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, step: 4 },
      'Shipped': { color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-100', text: 'text-blue-700', icon: Truck, step: 3 },
      'Processing': { color: 'from-amber-500 to-orange-500', bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock, step: 2 },
      'Pending': { color: 'from-gray-400 to-gray-500', bg: 'bg-gray-100', text: 'text-gray-700', icon: Package, step: 1 }
    };
    return configs[status] || configs['Pending'];
  };

  const filters = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'Processing', label: 'Processing', count: orders.filter(o => o.orderStatus === 'Processing').length },
    { id: 'Shipped', label: 'Shipped', count: orders.filter(o => o.orderStatus === 'Shipped').length },
    { id: 'Delivered', label: 'Delivered', count: orders.filter(o => o.orderStatus === 'Delivered').length }
  ];

  const filteredOrders = selectedFilter === 'all' ? orders : orders.filter(o => o.orderStatus === selectedFilter);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-gray-500 mt-1">Track and manage your orders</p>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none w-full sm:w-64 transition-all"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'from-indigo-500 to-purple-500' },
            { label: 'Delivered', value: orders.filter(o => o.orderStatus === 'Delivered').length, icon: CheckCircle, color: 'from-emerald-500 to-green-500' },
            { label: 'In Transit', value: orders.filter(o => o.orderStatus === 'Shipped').length, icon: Truck, color: 'from-blue-500 to-indigo-500' },
            { label: 'Processing', value: orders.filter(o => o.orderStatus === 'Processing').length, icon: Clock, color: 'from-amber-500 to-orange-500' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-linear-to-r ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedFilter === filter.id
                  ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = getStatusConfig(order.orderStatus);
            const isExpanded = expandedOrder === order._id;
            
            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Order Header */}
                <div 
                  className="p-5 sm:p-6 cursor-pointer"
                  onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-linear-to-r ${status.color} flex items-center justify-center shadow-lg`}>
                        <status.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{order._id}</p>
                        <p className="text-sm text-gray-500">{order.orderDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full ${status.bg} ${status.text} font-semibold text-sm`}>
                        {order.orderStatus}
                      </span>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Ordered</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-linear-to-r ${status.color} rounded-full transition-all duration-700`}
                        style={{ width: `${(status.step / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.productImage}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center text-sm font-medium text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                    <p className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Rs. {order.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-linear-to-br from-gray-50 to-indigo-50/30 p-5 sm:p-6">
                    {/* Order Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        <div>
                          <p className="text-xs text-gray-500">Shipping Address</p>
                          <p className="text-sm font-medium text-gray-800">{order.shippingAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-xs text-gray-500">Expected Delivery</p>
                          <p className="text-sm font-medium text-gray-800">{order.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                        <CreditCard className="w-5 h-5 text-pink-500" />
                        <div>
                          <p className="text-xs text-gray-500">Payment Method</p>
                          <p className="text-sm font-medium text-gray-800">{order.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white rounded-2xl p-4 hover:shadow-md transition-shadow">
                          <img
                            src={item.productImage}
                            alt={item.title}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                              ))}
                              <span className="text-xs text-gray-400 ml-1">Rate product</span>
                            </div>
                          </div>
                          <p className="font-bold text-gray-800">Rs. {item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <Eye className="w-5 h-5" />
                        Track Order
                      </button>
                      <button className="flex-1 bg-white border-2 border-indigo-200 text-indigo-700 py-3 px-6 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                        <RotateCcw className="w-5 h-5" />
                        Reorder
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet</p>
            <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;