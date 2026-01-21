<template>
  <div>
    <h1 class="text-2xl p-4">Marquee Test Page</h1>
    
    <!-- Simple Marquee Test -->
    <div class="bg-black text-white py-4 overflow-hidden">
      <div class="flex animate-marquee whitespace-nowrap">
        <div class="flex items-center gap-12 px-6">
          <span>TEST 1</span>
          <span>TEST 2</span>
          <span>TEST 3</span>
          <span>TEST 4</span>
          <span>TEST 1</span>
          <span>TEST 2</span>
          <span>TEST 3</span>
          <span>TEST 4</span>
        </div>
        <div class="flex items-center gap-12 px-6">
          <span>TEST 1</span>
          <span>TEST 2</span>
          <span>TEST 3</span>
          <span>TEST 4</span>
          <span>TEST 1</span>
          <span>TEST 2</span>
          <span>TEST 3</span>
          <span>TEST 4</span>
        </div>
      </div>
    </div>
    
    <div class="p-4">
      <p>If you see scrolling text above, the marquee works!</p>
      <p>If not, there's a CSS/animation issue.</p>
    </div>
  </div>
</template>
