<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      username: null
    };
  },
  created() {
    this.username = JSON.parse(localStorage.getItem('usuario')).email;

  },
  methods: {
    logout() {
      authService.logout();
      this.$router.push('/login');
    },
    goToProfile() {
      this.$router.push({ name: 'Actualizar Usuario', query: { username: this.username } });
    }
  }
};
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <div class="user-info">
        <span v-if="username">{{ username }}</span>
        <CIcon name="cil-user" size="lg" style="margin: 7px auto;" />
      </div>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownItem @click="goToProfile">
        <CIcon icon="cil-user" /> Perfil de usuario
      </CDropdownItem>
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" /> Cerrar sesión
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-left: 15px;
  margin-right: 15px;
}

.dropdown-item:hover {
  background-color: #42b883;
  color: white;
  cursor: pointer;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #42b883 !important;
  color: white;
  cursor: pointer;
}
</style>