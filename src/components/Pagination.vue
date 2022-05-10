<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 前一頁 -->
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 頁數 -->
      <li
        :class="['page-item', { active: page === pages.current_page }]"
        v-for="page in pages.total_pages"
        :key="page"
      >
        <a class="page-link" href="#" @click.prevent="$emit('emit-pages', page)">{{ page }}</a>
      </li>
      <!-- 下一頁 -->
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ["pages"],
};
</script>
