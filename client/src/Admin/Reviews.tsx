import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Star,
  MoreVertical,
  Trash2,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Review {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    profile: string;
  };
  product: {
    _id: string;
    title: string;
    productImage: string;
  };
  rating: number;
  review: string;
  createdAt: string;
}

const reviewsData: Review[] = [
  {
    _id: "1",
    user: {
      _id: "user1",
      fullName: "John Doe",
      email: "john@example.com",
      profile: "https://i.pravatar.cc/150?img=1",
    },
    product: {
      _id: "prod1",
      title: "Home Speaker 500",
      productImage:
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=100",
    },
    rating: 5,
    review:
      "Amazing product! Works perfectly with Alexa. Great sound quality and easy setup.",
    createdAt: "2024-11-12T10:30:00Z",
  },
  {
    _id: "2",
    user: {
      _id: "user2",
      fullName: "Jane Smith",
      email: "jane@example.com",
      profile: "https://i.pravatar.cc/150?img=2",
    },
    product: {
      _id: "prod2",
      title: "Wireless Headphones",
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
    },
    rating: 4,
    review:
      "Good headphones but a bit expensive. Sound quality is excellent though.",
    createdAt: "2024-11-13T14:20:00Z",
  },
  {
    _id: "3",
    user: {
      _id: "user3",
      fullName: "Mike Johnson",
      email: "mike@example.com",
      profile: "https://i.pravatar.cc/150?img=3",
    },
    product: {
      _id: "prod1",
      title: "Home Speaker 500",
      productImage:
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=100",
    },
    rating: 3,
    review: "It's okay, but had connectivity issues initially.",
    createdAt: "2024-11-14T09:15:00Z",
  },
  {
    _id: "4",
    user: {
      _id: "user4",
      fullName: "Sarah Wilson",
      email: "sarah@example.com",
      profile: "https://i.pravatar.cc/150?img=4",
    },
    product: {
      _id: "prod3",
      title: "Smart Watch Pro",
      productImage:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    },
    rating: 5,
    review: "Best smartwatch I've ever owned! Battery life is incredible.",
    createdAt: "2024-11-15T16:45:00Z",
  },
  {
    _id: "5",
    user: {
      _id: "user5",
      fullName: "David Brown",
      email: "david@example.com",
      profile: "https://i.pravatar.cc/150?img=5",
    },
    product: {
      _id: "prod2",
      title: "Wireless Headphones",
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
    },
    rating: 2,
    review: "Disappointed. Not worth the price. Build quality feels cheap.",
    createdAt: "2024-11-15T11:30:00Z",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === "all" || review.rating === parseInt(ratingFilter);

    return matchesSearch && matchesRating;
  });

  const stats = {
    total: reviews.length,
    averageRating: (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1),
    fiveStars: reviews.filter((r) => r.rating === 5).length,
    lowRated: reviews.filter((r) => r.rating <= 2).length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStarColor = (rating: number) => {
    if (rating >= 4) return "text-yellow-500";
    if (rating === 3) return "text-orange-500";
    return "text-red-500";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4) return <Badge className="bg-green-500">Excellent</Badge>;
    if (rating === 3) return <Badge className="bg-orange-500">Average</Badge>;
    return <Badge className="bg-red-500">Poor</Badge>;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? `fill-current ${getStarColor(rating)}`
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((r) => r._id !== id));
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reviews Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage customer reviews
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reviews
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {stats.averageRating}
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground">Out of 5 stars</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                5 Star Reviews
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.fiveStars}
              </div>
              <p className="text-xs text-muted-foreground">
                {((stats.fiveStars / stats.total) * 100).toFixed(0)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Low Rated (≤2★)
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.lowRated}
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>All Reviews</CardTitle>
                <CardDescription>Customer feedback and ratings</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.user.profile} />
                            <AvatarFallback>
                              {review.user.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {review.user.fullName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {review.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={review.product.productImage}
                            alt={review.product.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="font-medium max-w-xs truncate">
                            {review.product.title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {renderStars(review.rating)}
                          {getRatingBadge(review.rating)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="text-sm line-clamp-2">
                            {review.review}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(review._id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Review
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review._id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.user.profile} />
                          <AvatarFallback>
                            {review.user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {review.user.fullName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.user.email}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(review._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                      <img
                        src={review.product.productImage}
                        alt={review.product.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {review.product.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {renderStars(review.rating)}
                      {getRatingBadge(review.rating)}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {review.review}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Reviews;
