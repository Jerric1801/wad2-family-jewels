<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center relative">
            <!-- Success Icon -->
            <div class="flex justify-center mb-4">
                <span class="text-6xl">🎉</span>
            </div>
            <!-- Success Message -->
            <h2 class="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p class="text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully processed.
            </p>
            <!-- Button to navigate back -->
            <div class="flex justify-center space-x-4">
                <a href="/" class="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Go to Home
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/store/auth"; // Import the auth store
import { addOrder } from "../services/firebase/marketplace";

export default {
    async mounted() {
        const authStore = useAuthStore(); // Access the auth store
        const userId = authStore.user.uid; // Get the user ID from the store

        // Parse item from the URL query parameters
        const item = JSON.parse(decodeURIComponent(this.$route.query.item));

        // Ensure data is available before calling addNewOrder
        if (item && userId) {
            await this.addNewOrder(item, userId);
        } else {
            console.error("Missing item or userId");
        }
    },
    methods: {
        async addNewOrder(item, userId) {
            console.log("Adding new order on success page");

            // Generate the segments for the order number
            const firstSegment = Math.floor(Math.random() * 900) + 100; 
            const secondSegment = Math.floor(1000000 + Math.random() * 9000000); 
            const thirdSegment = Math.floor(1000000 + Math.random() * 9000000); 

            // Format the order number
            const orderNo = `${firstSegment}-${secondSegment}-${thirdSegment}`;

            const orderData = {
                date: new Date(),
                imageUrl: item.data.image,
                orderNumber: orderNo,
                productName: item.data.title,
                recipientName: userId, // How to get name from userId?
                price: item.data.price,
            };

            try {
                const orderId = await addOrder(userId, orderData);
                console.log("Order successfully added with ID:", orderId);
            } catch (error) {
                console.error("Error adding order:", error);
            }
        },
    },
};
</script>
