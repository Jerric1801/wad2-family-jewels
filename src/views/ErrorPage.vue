<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center relative">
            <!-- Failure Icon -->
            <div class="flex justify-center mb-4">
                <span class="text-red-500 text-6xl">❌</span>
            </div>
            <!-- Failure Message -->
            <h2 class="text-3xl font-bold text-red-600 mb-2">Payment Failed</h2>
            <p class="text-gray-600 mb-6">Unfortunately, your payment could not be processed. Please try again or
                contact support.</p>
            <!-- Button to retry or close -->
            <div class="flex justify-center space-x-4">
                <a href="/" class="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Go to Home
                </a>
            </div>
        </div>
    </div>
</template>