<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/"
        >GeekHunter<i class="bi bi-box-arrow-up-right"></i
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="/">Вакансии</a></li>
          <li class="nav-item">
            <a class="nav-link" href="/stats">Статистика</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-brand {
  color: rgb(88 92 249) !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  font-weight: 800 !important;
  font-size: 24px !important;
  font-family: "Montserrat", sans-serif !important;
  /* padding-left: 10px; */
}

.nav-link {
  font-weight: 600 !important;
  color: #494949 !important;
  font-family: "Montserrat", sans-serif !important;
}

.navbar {
  box-shadow: 0 0 10px #00000057;
}

#navbarNav {
  padding-top: 2px;
}

.navbar-toggler {
  border: none !important;
}

.navbar-toggler:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: none !important;
}
</style>