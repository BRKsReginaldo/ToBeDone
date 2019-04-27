import {get} from 'lodash'

const isTask = originalTask => testTask => testTask.id === originalTask.id;
const isParent = taskWithParent => testParent => testParent.id === taskWithParent.parent;

export const formatTasks = tasks => tasks.reduce((tasksResult, task) => {
    if (tasksResult.find(isTask(task))) return tasksResult; // If it's already on the new tasks array, ignore it

    if (task.parent) {
        const parent = tasks.find(isParent(task));

        if (!parent) return tasksResult;

        const parentOnResult = tasksResult.find(isParent(task));

        const iterateTasks = parentOnResult ? tasksResult : [...tasksResult, parent];

        const newParentChildTasks = [...get(parentOnResult, 'childTasks', []), task];
        const newParent = {
            ...parent,
            childTasks: newParentChildTasks
        };

        return iterateTasks.map(possibleParent => {
            return isParent(task)(possibleParent) ? newParent : possibleParent
        })
    }

    return tasksResult
}, []);