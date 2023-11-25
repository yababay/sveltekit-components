<script lang="ts">
    import { setSize } from './index.js'
    import Icon from '../../../../../bootstrap-icons/icons/telegram.svg?raw'

    export let size: number

 </script>

{@html setSize(Icon, size)}
