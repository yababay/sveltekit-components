<script lang="ts">
    import Form from '$lib/components/Form.svelte'
    import Field from '$lib/components/field/index.svelte'
    import Submit from '$lib/components/Submit.svelte'
    import Roles from '$lib/components/oracle/index.svelte'
    import type { RoleAttributes } from "$lib/types";

    export let role: RoleAttributes = {id: '', name: '', description: '', pathnames: []}

    const { id, name, description, users, pathnames } = role

    const legend = id ? `Правка роли «${name}» (${id})` : 'Новая роль'
</script>

<Form {legend}>
    {#if !id}
        <Field name="id" label="ID" placeholder="латинские буквы и цифры" value={id} required={true}/>
    {/if}
    <Field name="name" label="Название" placeholder="название роли по-русски" value={name} required={true}/>
    <Field name="description" label="Описание" placeholder="что разрешено этой роли" value={description} required={true}/>
    <Field name="pathnames" label="Пути" placeholder="доступные пути" value={(pathnames || []).join(', ')} required={true}/>
    <p class="form-text mt-2 pathnames-tip">
        Укажите через запятую или пробел к каким путям имеют доступ участники данной роли, 
        например <code class="text-body-secondary">/reports, /admin</code>. 
    </p>
    {#if id}
        <hr>
        <h6>Участники:</h6>
        <div>
            <Roles url="/api/users" name="users" tags={users || []}/>
            <div class="form-text mt-2">
                При вводе появляется список пользователей, в именах которых встречается набранный текст. 
                Выбирайте при помощи клавиш-стрелок, выбрав нажмите Enter. Для удаления из роли
                щелкните по соответствующему имени.
            </div>
        </div>
        <Submit label="Сохранить" back="/admin/roles"/>
    {:else}
        <Submit label="Создать"/>
    {/if}
</Form>

<style lang="scss">
    .pathnames-tip {
        margin-inline-start: 25%;
    }
</style>
