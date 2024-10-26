<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center relative">
            <!-- Success Icon -->
            <div class="flex justify-center mb-4">
                <span class="text-green-500 text-6xl">✔️</span>
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
