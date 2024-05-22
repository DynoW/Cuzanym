<template>
    <NuxtLayout name="home">
        <nav>
            <Hierarchy />
        </nav>
        <div class="main flex flex-col">
            <div class="rounded-lg p-5 w-full bg-white dark:bg-slate-800 dark:text-amber-100">
                <div class="text-3xl pb-1 border-b text-sky-700 dark:text-amber-400">
                    <h2>Tutorial</h2>
                </div>
                <div class="text-xl pt-3 text-sky-700 dark:text-amber-400">
                    <h3>
                        Cuvânt înainte & Scop.
                    </h3>
                </div>
                <div class="text-lg pt-2">
                    <h4>
                        Principalul scop al acestui website este de a conecta elevii cu directoratul & consiliul
                        elevilor, pentru a rezolva problemele comune din liceu.
                        Dorim să încurajăm generațiile următoare să își exprime opiniile, așa că propunem o deschidere
                        spre acest viitor prin intermediul anonimatului.
                    </h4>
                </div>
                <div class="text-xl pt-3 text-sky-700 dark:text-amber-400">
                    <h3>
                        Reguli de folosire.
                    </h3>
                </div>
                <div class="text-lg pt-2">
                    <h4>
                        1. Niciun cuvânt vulgar nu va fi tolerat, indiferent unde apare acesta.
                    </h4>
                    <h4>
                        2. Defăimarea la adresa unui profesor sau elev este strict interzisă și conținutul nu va ajunge
                        pe
                        forum.
                    </h4>
                    <h4>
                        3. Secțiunea <NuxtLink to="/forum/raportări" class="text-orange-200">"Raportează"</NuxtLink>
                        este rezervată pentru comunicarea
                        în situații serioase,
                        deoarece este
                        o conexiune directă între director și elev. Orice plângere banală sau
                        nejustificată nu va fi trimisă.
                    </h4>
                </div>
                <div class="text-xl pt-3 text-sky-700 dark:text-amber-400">
                    <h3>
                        Cum să folosiți Cuzanym:
                    </h3>
                </div>
                <div class="text-lg pt-2">
                    <h4>
                        1. Pentru o discuție normală cu alți elevi, folosiți topicul <NuxtLink to="/forum/diverse"
                            class="text-orange-200">"Diverse"</NuxtLink>.
                    </h4>
                    <h4>
                        2. Puteți folosi tag-uri precum: <span class="text-orange-200">#mate, #romana</span>.
                    </h4>
                    <h4>
                        3. Pentru discuții localizate, folosiți topicurile special amenajate. (Exemplu: <span
                            class="text-orange-200">Activități
                            extrașcolare, Liceu, etc.</span>)
                    </h4>
                    <h4>
                        4. Topicul <NuxtLink to="/forum/liceu" class="text-orange-200">"Liceu"</NuxtLink> este rezervat
                        numai pentru sugestii
                        despre liceu
                        sau semnalarea unor probleme în liceu. </h4>
                    <h4>
                        5. Dacă aveți o problemă serioasă sau sunteți sigur(ă) că vi s-a făcut o nedreptate,
                        folosiți
                        secțiunea <NuxtLink to="/forum/raportări" class="text-orange-200">"Raportări"</NuxtLink>, în
                        care puteți vedea doar
                        raportările
                        dvs.
                    </h4>
                    <h4 class="text-base">
                        Obs: Moderarea postărilor se face de către moderatori. Dacă o postare are <span
                            class="text-orange-200">"pending"</span>,
                        înseamnă că trebuie aprobată de un moderator.
                    </h4>
                </div>
                <div class="text-xl pt-3 text-sky-700 dark:text-amber-400">
                    <h3>
                        Lucruri work in progress:
                    </h3>
                </div>
                <div class="text-lg pt-2">
                    <h4>
                        -> cluburi
                    </h4>
                    <h4>
                        -> evenimente
                    </h4>
                    <h4>
                        -> reactii comentarii
                    </h4>
                    <h4>
                        -> profil utilizatori
                    </h4>
                </div>
                <div class="text-lg pt-3 text-sky-700 dark:text-amber-400">
                    <h3>
                        Vă rugăm să ne semnalați orice problemă sau sugestie pe care o aveți. (În topicul "<NuxtLink
                            to="/forum/bug-uri%20site" class="text-orange-200">Bug-uri site</NuxtLink>",
                        respectiv "<NuxtLink to="/forum/sugestii%20site" class="text-orange-200">Sugestii site
                        </NuxtLink>" din forum)
                    </h3>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>