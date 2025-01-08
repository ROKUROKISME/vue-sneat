<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card mb-4">
                <h5 class="card-header">Tambah User</h5>
                <form class="card-body" action="users.create" method="post">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control is-invalid" name="username" id="username"
                            placeholder="Username" />
                        <div class="invalid-feedback">
                            Tidak boleh kosong
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="nama" class="form-label">Username</label>
                        <input type="text" class="form-control is-invalid" name="nama" id="nama" placeholder="Nama" />
                        <div class="invalid-feedback">
                            Tidak boleh kosong
                        </div>
                    </div>


                    <div class="mb-3">
                        <label for="jk" class="form-label">Jenis Kelamin</label>
                        <select class="form-select is-invalid" name="jk" id="jk">
                            <option value="">Pilih</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        <div class="invalid-feedback">
                            Tidak boleh kosong
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="text" class="form-control  is-invalid" name="password" id="password"
                            placeholder="********" value="" />
                        <div class="invalid-feedback">
                            Tidak boleh kosong
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary me-1"><i class="bx bx-save me-1"></i> Simpan</button>
                    <RouterLink :to="{ name: 'users.index' }" class="btn btn-secondary"><i
                            class="bx bx-left-arrow-alt me-1"></i> Kembali
                    </RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>