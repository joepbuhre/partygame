<template>
    <div class="gamerules">
        <div @click="show=!show" class="btn btn-warning"><span v-if="!show">Bekijk hier de spelregels</span><span v-if="show">Verberg de spelregels</span></div>
        <div v-show="show" class="inner">
            <div @click="show=!show" class="btn btn-warning"><span v-if="!show">Bekijk hier de spelregels</span><span v-if="show">Verberg de spelregels</span></div>
            <h2 id="het-mega-fantastische-geweldige-ex-kerstspel-nu-nieuwjaar-spel">Het mega-fantastische-geweldige ex-kerstspel nu Nieuwjaar spel</h2>
            <h3 id="benodigdheden-">Benodigdheden:</h3>
            <ol>
                <li>
                    <p>Ieder team krijgt 4 pionnen van haar teamkleur en 2 dobbelstenen </p>
                </li>
                <li>
                    <p>Ieder team pakt een telefoon waarop de app geïnstalleerd staat. De app dient tijdens het spel gebruikt te worden </p>
                </li>
                <li>
                    <p>Cadeautjes </p>
                </li>
                <li>
                    <p>Papier </p>
                </li>
                <li>
                    <p>Drinken en wat lekkers</p>
                </li>
                <li>
                    <p>Een team. Deze kan bestaan uit 2 of 3 spelers</p>
                </li>
            </ol>
            <h3 id="spelregels-hoe-werkt-het-spel-">Spelregels/ hoe werkt het spel?:</h3>
            <ol>
                <li>
                    <p>Ieder teamlid dobbelt. Het hoogste getal dat is gedobbeld is lijdend. </p>
                </li>
                <li>
                    <p>Je mag het aantal stappen zetten dat je hebt gegooid. Behalve als jij een 6 gooit. </p>
                </li>
                <li>
                    <p>Nadat je dit hebt gedaan ga je de minigame spelen dat bij jou gegooide aantal hoort. (zie onderstaande lijst)</p>
                </li>
                <li>
                    <p>Wanneer je een minigame wint kan je dit aangeven in de app. Je spaart dan pionnen. Heb je 3x een minigame gewonnen dan mag je een nieuwe pion op het bord zetten. Dit geeft de app aan. </p>
                </li>
                <li>
                    <p>Win je de minigame niet. Dan gebeurt er niks </p>
                </li>
                <li>
                    <p>Hieronder staat beschreven wat er bij elk gedobbelde getal moet gebeuren. </p>
                </li>
                <li>
                    <p>Wanneer heb je gewonnen? Als alle pionnen binnen zijn. Je moet precies per beurt uitkomen. Je mag niet over de andere pionnen heen lopen. </p>
                </li>
                <li>
                    <p>Je speelt het spel net zo lang totdat een iemand als zijn of haar pionnen binnen heeft en wint.</p>
                </li>
            </ol>
            <h3 id="dobbel-regels-je-gooit-">Dobbel regels: je gooit:</h3>
            <ol>
                <li>
                    <p>Je speelt 30 seconds. Je moet alle 5 de antwoorden goed hebben. Dan heb je de minigame gehaald</p>
                </li>
                <li>
                    <p>Je speelt pictionary. Je tekent het onderwerp dat door de app word voorgesteld. Raad je teamlid het antwoord binnen 30 seconden dan heb je de minigame gehaald.</p>
                </li>
                <li>
                    <p>Vraag maar raak. Je krijgt een vraag te zien die je aan je teamgenoot moet stellen. Heeft je teamlid de vraag binnen 20 seconden goed dan heb je de minigame behaald.</p>
                </li>
                <li>
                    <p>Helaas. Je moet een plek achteruit</p>
                </li>
                <li>
                    <p>De cadeaumeter. Druk op dobbelsteen 5 in de app. Je cadeaumeter loopt vol. Als je 3 cadeautjes hebt mogen jij en je teamgenoot een cadeautje open maken. </p>
                </li>
                <li>
                    <p>Aso hoog. Zorg ervoor dat iedereen aan de tafel wat te drinken heeft. Verder kiest een ander team naar keuze jou minigame. Alleen als je de minigame behaald mag je 6 stappen vooruit. </p>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false
            }
        }
    }
</script>
<style lang="scss" scoped>
.inner {
    text-align: left;
    position: fixed;
    overflow-y: scroll;
    top:50px;
    left:0;
    right:0;
    bottom:0;
    background: rgba(255, 255, 255, 0.903);
    z-index: 9999;
}
</style>