<template>
  <div class="bg-gray-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Opened positions</h2>
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead>
          <tr
            class="bg-gray-700 text-gray-300 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Pair</th>
            <th class="py-3 px-6 text-left">Timestamp</th>
            <th class="py-3 px-6 text-left">Price</th>
            <th class="py-3 px-6 text-left">Stop profit</th>
            <th class="py-3 px-6 text-left">Stop loss</th>
          </tr>
        </thead>
        <tbody class="text-gray-300 text-sm font-light">
          <tr class="border-b border-gray-700 hover:bg-gray-600">
            <td class="py-3 px-6 text-left">BTCUSDC</td>
            <td class="py-3 px-6 text-left">2024-09-10 12:00:00</td>
            <td class="py-3 px-6 text-left">$59,123.87</td>
            <td class="py-3 px-6 text-left">$61,320.45</td>
            <td class="py-3 px-6 text-left">$58,112.99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
