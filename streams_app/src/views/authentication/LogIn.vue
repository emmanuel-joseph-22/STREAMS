<template>
    <div class="login">
        <div class="prj-name">
            <!--<b>STREAMS</b>-->
        </div>
        <div class="container fixed bottom-3 top-3 right-3 bg-blue-200 h-17/20 w-3/4 sm:w-2/4 md:w-1/3 lg:w-2/3 xl:w-2/5 text-black rounded-lg flex flex-col items-center justify-center p-5">
            <h1 class="login font-bold text-3xl text-blue-700 mb-10">LOG IN</h1>
            <div class="forms">

                <label for="user_id" class="font-bold flex flex-col mb-1 text-left">User ID</label>
                <input autofocus id="input_userid" type="text" name="user_id" required placeholder="User ID" class="p-2 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <label for="password" class="font-bold flex flex-col mb-1 text-left">Password</label>
                <input type="password" id="input_password" name="password" required placeholder="Password" class="p-2 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <router-link to="/reading">
                <label for="guest" id="guest" class="font-bold underline cursor-pointer flex flex-col text-left">Guest.</label>
                </router-link>

                <div class="flex justify-center"> <!-- to centers its content horizontally -->
                    <router-link to="/reading">
                    <button class="submit bg-blue-700 text-blue-200 py-2 px-4 rounded-full mt-5 flex flex-col">Log In</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
