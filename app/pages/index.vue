<template>
    <!-- <IntroValue /> -->
    <GalleryHero :title="$t('heros.bring_tech_to_everyone')" :description="$t('heros.success_definition')"
        :author="$t('heros.chau_dara')" :authorTitle="$t('heros.founder')" :showCTA="true" :images="images" />

    <!-- YouTube Component -->
    <div class="container mx-auto px-4 py-8">
        <YouTube channel-url="@tfdevs" :subscriber-count="44" channel-link="https://www.youtube.com/@tfdevs" />
    </div>

    <!-- Connect With Us Component -->
    <div class="container mx-auto px-4 py-8">
        <ConnectWithUs :socialLinks="socialLinks" />
    </div>


    <!-- <Client />
    <Testimonial />
    <PlatformInfo />
    <Approach />
    <ReachUs /> -->
</template>
<script setup lang="ts">
const images = [
    {
        src: '/images/heros/cadt-idg.JPG',
        alt: 'Teaching at CADT IDG'
    },
    {
        src: '/images/heros/speaking-in-group.jpeg',
        alt: 'Speaking in a group'
    },
    {
        src: '/images/heros/me-teaching-bootcamp-photo-taken-from-behind.jpg',
        alt: 'Teaching bootcamp session'
    },
    // {
    //     src: '/images/heros/tfd-front.jpg',
    //     alt: 'Teaching For Devs front'
    // },
    {
        src: '/images/heros/cloud-con.jpeg',
        alt: 'Cloud conference'
    },
    {
        src: '/images/heros/giving-award.jpg',
        alt: 'Giving award ceremony'
    },
    {
        src: '/images/heros/hennge.JPG',
        alt: 'Hennge event'
    },
    {
        src: '/images/heros/master.JPG',
        alt: 'Master program event'
    },
    {
        src: '/images/heros/paris.JPG',
        alt: 'Paris speaking engagement'
    },
    {
        src: '/images/heros/policy-con.jpeg',
        alt: 'Policy conference'
    },
    {
        src: '/images/heros/speaking-aiecs.jpeg',
        alt: 'Speaking at AIECS'
    },
    {
        src: '/images/heros/copenhagen-denmark.jpg',
        alt: 'Copenhagen, Denmark'
    },
    {
        src: '/images/heros/presenting-master-midterm.JPG',
        alt: 'Presenting master midterm project'
    },
    {
        src: '/images/heros/teaching-ppo.JPG',
        alt: 'Teaching at PPO'
    },
    {
        src: '/images/heros/tokyo-tower.JPG',
        alt: 'Tokyo Tower visit'
    },
    { src: '/images/heros/photo-001.webp', alt: 'Photo 1' },
    { src: '/images/heros/photo-002.webp', alt: 'Photo 2' },
    { src: '/images/heros/photo-003.webp', alt: 'Photo 3' },
    { src: '/images/heros/photo-004.webp', alt: 'Photo 4' },
    { src: '/images/heros/photo-005.webp', alt: 'Photo 5' },
    { src: '/images/heros/photo-006.webp', alt: 'Photo 6' },
    { src: '/images/heros/photo-007.webp', alt: 'Photo 7' },
    { src: '/images/heros/photo-008.webp', alt: 'Photo 8' },
    { src: '/images/heros/photo-009.webp', alt: 'Photo 9' },
    { src: '/images/heros/photo-010.webp', alt: 'Photo 10' },
    { src: '/images/heros/photo-011.webp', alt: 'Photo 11' },
    { src: '/images/heros/photo-012.webp', alt: 'Photo 12' },
    { src: '/images/heros/photo-013.webp', alt: 'Photo 13' },
    { src: '/images/heros/photo-014.webp', alt: 'Photo 14' },
    { src: '/images/heros/photo-015.webp', alt: 'Photo 15' },
    { src: '/images/heros/photo-016.webp', alt: 'Photo 16' },
    { src: '/images/heros/photo-017.webp', alt: 'Photo 17' },
]
const socialLinks = {
    facebook: 'https://www.facebook.com/teachingfordevelopment',
    linkedin: 'https://www.linkedin.com/in/kimang-kheang/',
    instagram: 'https://www.instagram.com/darachaukh',
    telegram: 'https://t.me/tfdTech',
    youtube: 'https://www.youtube.com/c/TeachingForDevelopment',
    github: 'https://github.com/tfd-ed'
}

</script>