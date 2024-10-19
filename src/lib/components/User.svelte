<script lang="ts">
    import Form from "$lib/components/Form.svelte";
    import Field from "$lib/components/field/index.svelte";
    import Password from "$lib/components/field/Password.svelte";
    import Submit from "$lib/components/Submit.svelte";
    import Switch from "./input/Switch.svelte";
    import type { UserAttributes } from "$lib/types";

    export let user: UserAttributes = { login: '', name: '', password: '', roles: [], enabled: true }
    const {login, name, enabled, roles } = user
    const legend = login ? `Правка данных пользователя ${login}` : 'Новый пользователь'

</script>

<Form {legend}>
    {#if !login}
        <Field name="login" label="Логин" placeholder="латинские буквы и цифры" value={login} />
    {/if}
    <Field name="name" label="Полное имя" placeholder="фамилия, имя, отчество по-русски" value={name} />
    {#if (roles || []).length}
        <Field name="roles" label="Роли">
            <span class="input-group-text d-inline-block">
                {#each (roles || []) as role}
                    <span class="badge text-bg-secondary me-1">{role}</span>
                {/each}
            </span>
        </Field>
        <p class="form-text mb-3 roles-tip">
                Для добавления или удаления используйте раздел <a href="/admin/roles" rel="external">«Роли»</a>.
        </p>
    {/if}
    <Password name="password" label="Пароль" />
    <Password name="password-again" label="Пароль (еще раз)" placeholder="подтверждение пароля" />
    {#if login}
        <Switch name="enabled" labelOn="активен" labelOff="заблокирован" checked={enabled}/>
        <Submit label="Сохранить" back="/admin/users"/>
    {:else}
        <input name="enabled" value="on" type="hidden">
        <Submit label="Зарегистрировать" />
    {/if}
</Form>

<style lang="scss">
    .roles-tip {
        margin-inline-start: 25%;
    }
</style>
