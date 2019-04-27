import {GapiClient} from "../helpers/gapi";

export const listTasks = (tasklist, parameters = {}) => GapiClient().tasks.tasks.list({
    tasklist,
    ...parameters
});