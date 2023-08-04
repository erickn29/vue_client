<script>
import Request from "/src/assets/js/request.js";
import Render from "/src/assets/js/render.js";
import VacancyList from "/src/components/VacancyList.vue"

export default {
  // props: {
  //   count: {
  //     type: Number,
  //     required: true,
  //     default: 0,
  //   },
  // },
  // computed: {
  //   computedCount() {
  //     return this.count;
  //   },
  // },
  // watch: {
  //   count(newValue, oldValue) {
  //     console.log(newValue, oldValue)
  //   },
  // },
  methods: {
    filterVacancy() {
      VacancyList.methods.getVacanciesData()
    },
    getFilterOptions() {
      const request = new Request();

      request.getSearchFormItem('http://127.0.0.1:8000/api/v1/specialities_by_list/')
      .then((data) => {
        const specialities = data;
        const render = new Render();
        render.renderSearchFormItem(specialities, '#speciality');
      });

      request.getSearchFormItem('http://127.0.0.1:8000/api/v1/languages_by_list/')
      .then((data) => {
        const languages = data;
        const render = new Render();
        render.renderSearchFormItem(languages, '#language');
      });

      request.getSearchFormItem('http://127.0.0.1:8000/api/v1/grades_by_list/')
      .then((data) => {
        const languages = data;
        const render = new Render();
        render.renderSearchFormItem(languages, '#grade');
      });

      request.getSearchFormItem('http://127.0.0.1:8000/api/v1/experiences_by_list/')
      .then((data) => {
        const languages = data;
        const render = new Render();
        render.renderSearchFormItem(languages, '#experience');
      });

      request.getSearchFormItem('http://127.0.0.1:8000/api/v1/cities_by_list/')
      .then((data) => {
        const languages = data;
        const render = new Render();
        render.renderSearchFormItem(languages, '#location');
      });
    },
  },
  mounted() {
    this.getFilterOptions();
  },
};
</script>

<template>
  <div class="form-wrapper">
    <div class="mb-2">
      <select class="form-select" name="speciality" id="speciality">
        <option value="">Специализация</option>
      </select>
    </div>

    <div class="mb-2">
      <select class="form-select" name="language" id="language">
        <option value="">Язык</option>
      </select>
    </div>

    <div class="mb-2">
      <select class="form-select" name="grade" id="grade">
        <option value="">Уровень</option>
      </select>
    </div>

    <div class="mb-2">
      <select class="form-select" name="experience" id="experience">
        <option value="">Опыт</option>
      </select>
    </div>

    <div class="mb-2">
      <select class="form-select" name="location" id="location">
        <option value="">Локация</option>
      </select>
    </div>

    <div class="mb-2">
      <input
        type="number"
        name="salary_from"
        class="form-control"
        placeholder="Зарплата от..."
        value="30000"
        id="id_salary_from"
      />
    </div>

    <div class="mb-2 form-check">
      <div class="remote-section">
        <input type="checkbox" name="is_remote" id="id_is_remote" />
        <label class="form-check-label" for="id_is_remote"
          >Только удалённая работа</label
        >
      </div>
    </div>

    <div class="mb-2">
      <button @click="filterVacancy" class="btn submit-button" type="submit" style="width: 100%">
        Применить фильтры
      </button>
    </div>
  </div>
</template>

<style>

.form-wrapper {
    /* padding: 30px 10px 10px 10px;
    position: sticky;
    top: 57px; */
}

.form-check {
    padding-left: 2px !important;
}

.form-check-label{
    padding-left: 7px;
}

.submit-button {
    background-color: rgb(88 92 249) !important;
    color: #fff !important;
}

.submit-button:hover {
    background-color: rgb(78, 80, 211) !important;
    color: #fff !important;
}

.form-select, .form-control {
    border: none !important;
    background-color: #1b1d531c !important;
}

.form-select, .form-control:focus {
    box-shadow: none !important;
}

</style>