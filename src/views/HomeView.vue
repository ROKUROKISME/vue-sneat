<template>
    <Suspense>
        <div class="row">
            <div class="col-lg-8 mb-4 order-0">
                <div class="home">
                    <h1>This is an Home page</h1>
                </div>
            </div>
        </div>
        <template #fallback>
            <h1>NOW LOADING ... </h1>
        </template>
    </Suspense>

</template>
<style>
@media (min-width: 1024px) {
    .home {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>