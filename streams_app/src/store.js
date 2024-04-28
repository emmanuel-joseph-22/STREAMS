import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state: {
        role: null, // User's role state
    },
    mutations: {
        // Mutation to set the user's role
        setRole(state, role) {
            state.role = role;
        },
    },
    actions: {
        // Action to update the user's role in the store
        updateRole({ commit }, role) {
            commit('setRole', role);
        },
    },
    plugins: [createPersistedState()], // Add the vuex-persistedstate plugin
});

export default store;
