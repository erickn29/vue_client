<script>
import Request from "/src/assets/js/request.js";
import Render from "/src/assets/js/render.js";
import Filter from "/src/components/Filter.vue";

export default {
  components: {
    Filter,
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    computedCount() {
      console.log('Computed')
      return this.count;
    },
  },
  methods: {
    getVacanciesData(id) {
      let requestUrl = $(id).attr("value");
      const request = new Request();
      const render = new Render();
      const params = {
        speciality: $("#speciality").val(),
        language: $("#language").val(),
        grade: $("#grade").val(),
        experience: $("#experience").val(),
        location: $("#location").val(),
        salary_from: $("#id_salary_from").val(),
        is_remote: $("#id_is_remote").prop("checked"),
      };
      request
        .getVacanciesData(requestUrl, params)
        .then((data) => {
          this.count = data.count
          let vacanciesList = render.renderVacanciesList(data);
          $(".vacancies-list").html(vacanciesList);
          $("#prev").attr("value", data.previous);
          $("#next").attr("value", data.next);
          $('.vacancy-count').html(`Найдено вакансий: ${this.count}`)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    toTop() {
      window.scrollTo(0, 0);
    },
    updateCount(newCount) {
      this.count = newCount;
    },
  },
  mounted() {
    this.getVacanciesData();
    this.toTop();
  },
};
</script>

<template>
  <div class="container main-container">
    <div class="row">
      <div class="col-md-3 left-side">
        <Filter />
        <div class="vacancy-count">Найдено вакансий: {{count}}</div>
      </div>
      <div class="col-md-9">
        <div class="vacancies-list"></div>
        <div class="paginator d-flex justify-content-center mb-4">
          <button
            id="prev"
            @click="
              getVacanciesData('#prev');
              toTop();
            "
            class="btn submit-button mx-1"
          >
            Предыдущая страница
          </button>
          <button
            id="next"
            @click="
              getVacanciesData('#next');
              toTop();
            "
            class="btn submit-button mx-1"
          >
            Следующая страница
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-container {
  padding-top: 57px;
}

.left-side {
  padding: 30px 10px 10px 10px;
  /* position: sticky; */
  top: 57px;
}

.vacancies-list {
  padding-top: 20px;
}

.vacancy-item {
  padding: 10px;
}

.stack-item {
  padding: 2px 4px;
  font-size: 0.75rem;
  background-color: #585cf942;
  font-weight: 500;
  color: #000000;
  border-radius: 2px;
}

.vacancy-salary {
  color: #3da991 !important;
}

.vacancies-list svg {
  padding-bottom: 4px;
}

.vacancy-title svg {
  padding-bottom: 4px;
}

.vacancy-title a:hover {
  text-decoration: none !important;
  color: #fa9e70;
  transition: 0.2s;
}

.vacancy-title a {
  text-decoration: none !important;
  color: #212529;
  transition: 0.2s;
}
</style>