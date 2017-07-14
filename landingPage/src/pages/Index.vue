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



        <div class="screen-box playful-photo">
            photo + playful text
        </div>



        <div class="screen-box steps-detailed">
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
    font-size: 21px;
    color: #FFFFFF;

    background-color: #303030;
    padding: 12px 30px 10px 18px;
}

.header__logo_sub-title {
    font-size: 13px;
}

.header__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 440px;
}

.header__menu__link {
    font-weight: 600;
    color: #F62440;
    font-size: 15px;
}

.header__menu__link--cta {
    font-weight: 600;
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
    justify-content: space-between;
    align-items: center;

    background-color: #303030;
    padding: 0 70px;
    margin-bottom: 10px;
}

.presentation__text {
    color: #FFFFFF;
    width: 430px;
}

.presentation__text__title {
    font-weight: 600;
    font-size: 40px;
}

.presentation__text__sub-title {
    font-size: 19px;
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
    padding: 150px 138px;
}

.for-steps__header {
    margin-bottom: 100px;
}

.for-steps__header__sub-title {
    font-size: 19px;
}

.for-steps__header__title {
    font-size: 40px;
    color: #F62440;
    font-weight: 600;
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
    color: #3C4858;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 800;
    width: 150px;
    height: 70px;
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
    padding: 150px 138px;
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
}

.steps-detailed__step__content {
    
}
</style>
