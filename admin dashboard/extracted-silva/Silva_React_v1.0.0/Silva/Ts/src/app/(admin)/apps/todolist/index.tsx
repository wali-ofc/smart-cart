import PageBreadcrumb from '@/component/PageBreadcrumb';
import TodoList from './component/TodoList';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Todo List' />
            <PageBreadcrumb title='Todo List' PageTitle='Apps' SubTitlte='Todo List' />
            <TodoList />
        </>
    )
}

export default Index