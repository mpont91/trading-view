<template>
  <div class="bg-gray-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Performance summary</h2>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-green-900 text-green-300 p-4 rounded-lg">
        <p>Total trades: <span class="font-semibold">100</span></p>
      </div>
      <div class="bg-green-900 text-green-300 p-4 rounded-lg">
        <p>Successful trades: <span class="font-semibold">70</span></p>
      </div>
      <div class="bg-red-900 text-red-300 p-4 rounded-lg">
        <p>Failed trades: <span class="font-semibold">30</span></p>
      </div>
      <div class="bg-blue-900 text-blue-300 p-4 rounded-lg">
        <p>Total PnL: <span class="font-semibold">$30</span></p>
      </div>
      <div class="bg-blue-900 text-blue-300 p-4 rounded-lg">
        <p>Total PnL percentage: <span class="font-semibold">34%</span></p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h3 class="text-lg font-semibold mt-4">Best performing pair</h3>
        <div class="bg-green-900 text-green-300 p-4 rounded-lg mt-2">
          <p>Pair: <span class="font-semibold">BTCUSDC</span></p>
          <p>PnL: <span class="font-semibold">$10</span> (30%)</p>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mt-4">Worst performing pair</h3>
        <div class="bg-red-900 text-red-300 p-4 rounded-lg mt-2">
          <p>Pair: <span class="font-semibold">ETHUSDC</span></p>
          <p>PnL: <span class="font-semibold">-$7</span> (-20%)</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
