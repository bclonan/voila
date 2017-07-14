<template>
    <div class="container">
        <header class="header">
            <div class="header__logo">
                Voilà
                <div class="header__logo_sub-title">Makes you go “Ooh la la”</div>
            </div>

            <div class="header__menu">
                <a class="header__menu__link" href="#">How?</a>
                <a class="header__menu__link" href="#">Examples</a>
                <a class="header__menu__link--cta" href="#">Let's do it!</a>
            </div>
        </header>



        <div class="screen-box presentation">
            <div class="presentation__text">
                <h1 class="presentation__text__title">Convert online forms into sexy typeforms</h1>
                <div class="presentation__text__sub-title">People will beg to <strike>feel</strike> <i>fill</i> them out</div>
            </div>

            <div class="presentation__video">
                Video
            </div>
        </div>



        <div class="screen-box for-steps">
            <div class="for-steps__container">
                <div class="for-steps__header">
                    <div class="for-steps__header__sub-title">Lorem ipsum dolor sit amet, consectetur</div>
                    <h2 class="for-steps__header__title">Four steps to conversational heaven</h2>
                </div>

                <div class="for-steps__steps">
                    <div class="for-steps__steps__step card">
                        <div class="card__image">
                        </div>

                        <div class="card__title">
                            Add HTML script
                        </div>

                        <div class="card__text">
                            You know how to stick it in there, don’t you? Don’t worry if you don’t—it’s not hard.
                        </div>
                    </div>

                    <div class="for-steps__steps__step card">
                        <div class="card__image">
                        </div>

                        <div class="card__title">
                            Add a unique identifyer code
                        </div>

                        <div class="card__text">
                            You know me, but I don’t know you. Make sure you add your identifier code so we know where to send your data?
                        </div>
                    </div>

                    <div class="for-steps__steps__step card">
                        <div class="card__image">
                        </div>

                        <div class="card__title">
                            Complete setup on your website
                        </div>

                        <div class="card__text">
                            Do I have to get into all the details? You get to play with code on your webiste. I’m feeling kinda kinky, baby!
                        </div>
                    </div>

                    <div class="for-steps__steps__step card">
                        <div class="card__image">
                        </div>

                        <div class="card__title">
                            Push the button!
                        </div>

                        <div class="card__text">
                            Or caress it. We don’t care. Take people to conversational data collection heaven. You know you want to.
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="screen-box playful-photo">
            photo + playful text
        </div>



        <div class="screen-box steps-detailed">
            <div class="steps-detailed__container">
                <div class="steps-detailed__step">
                    <div class="steps-detailed__step__title">
                        1. Sign in to your Typeform account
                    </div>

                    <div class="steps-detailed__step__content">
                        <a class="header__menu__link--cta" href="#">Log in to Typeform</a>

                        <a href="#">Don't have account</a>
                        <a href="#">Get started</a>
                    </div>

                    <div class="steps-detailed__step__bullets nav-bullets">
                        <div class="nav-bullets__bullet"></div>
                        <div class="nav-bullets__bullet"></div>
                        <div class="nav-bullets__bullet"></div>
                        <div class="nav-bullets__bullet"></div>
                        <div class="nav-bullets__bullet"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="examples">
            <div class="examples__element"></div>

            <div class="examples__content">
                <div class="examples__content__title">
                    Examples
                </div>
                <div class="examples__content__header">
                    Ham hock bacon
                </div>
                <div class="examples__content__description">
                    Spicy jalapeno sausage prosciutto ball tip turkey
                    chicken alcatra landjaeger. Spicy jalapeno sausage
                    prosciutto ball tip turkey chicken alcatra landjaeger.
                </div>


            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.container {
    padding: 0 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 75px;
    height: 140px;
}

.header__logo {
    font-size: 22px;
    color: #FFFFFF;

    background-color: #303030;
    padding: 12px 30px 10px 18px;
}

.header__logo_sub-title {
    font-size: 14px;
}

.header__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 440px;
}

.header__menu__link {
    font-family: 'AvenirNext-DemiBold';
    color: #F62440;
    font-size: 16px;
}

.header__menu__link--cta {
    font-family: 'AvenirNext-DemiBold';
    color: #F62440;
    font-size: 15px;

    border: 3px solid #F62440;
    padding: 15px 52px;
}

.screen-box {
    height: 100vh;
}

.presentation {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #303030;
    padding: 0 5%;
}

.presentation__text {
    color: #FFFFFF;
    width: 505px;
}

.presentation__text__title {
    font-family: 'AvenirNext-DemiBold';
    font-size: 48px;
}

.presentation__text__sub-title {
    font-size: 22px;
}

.presentation__video {
    width: 592px;
    height: 419px;
    background-color: #FFFFFF;
    box-shadow: -1px 7px 24px 0px rgba(0,0,0,0.53);

    display: flex;
    justify-content: center;
    align-items: center;
}

.for-steps {
    padding: 0 5%;
    display: flex;
    align-items: center;
}

.for-steps__container {
    height: 80%;
    width: 100%;
}

.for-steps__header {
    margin-bottom: 100px;
}

.for-steps__header__sub-title {
    font-size: 22px;
}

.for-steps__header__title {
    font-family: 'AvenirNext-DemiBold';
    font-size: 48px;
    color: #F62440;
    margin: 5px 0;
}

.for-steps__steps {
    display: flex;
    justify-content: space-between;
}

.card {
    width: 180px;
}

.card__image {
    background-color: #F9F9F9;
    width: 180px;
    height: 160px;

    margin-bottom: 25px;
    position: relative;
}

.card__title {
    font-size: 18px;
    color: #3C4858;
    font-family: 'Avenir-Heavy';
    width: 150px;
    height: 70px;
}

.card__text {
    font-size: 16px;
}

.playful-photo {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #F62440;
    
    font-weight: 600;
    color: #FFFFFF;
}

.steps-detailed {
    display: flex;
    align-items: center;
    justify-content: center;
}

.steps-detailed__container {
    height: 60%;
}

.steps-detailed__step {
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;
}

.steps-detailed__step__title {
    font-size: 36px;
    color: #3C4858;
    text-align: center;

    font-family: 'AvenirNext-DemiBold';
}

.steps-detailed__step__content {
    
}

.examples {
    height: 960px;
    display: flex;
    flex-direction: row;
}

.examples__element {
    width: 60%;
    height: 635px;
    background: grey;
}

.examples__content {
    flex-direction: column;
    width: 40%;
    padding: 50px 50px;
}

.examples__content__title {
    font-size: 20px;
    font-weight: 300;
    color: #3C4858;
}

.examples__content__header {
    font-size: 42px;
    font-weight: 500;
    color: #F62440;
}

.examples__content__description {
    font-size: 16px;
    font-weight: 300;
    color: #8D9AAD;
    line-height: 26px;
}

</style>
