<template>
    <home-page>
        <div class="tips">
            <div class="tips_header">
                <h1 class="relative mt-4 font-bold text-1xl font-sans sm:text-1xl md:text-2xl lg:text-4xl">USEFUL TECHNIQUES</h1>
                <p class="px-4 py-2 text-center">This page is intended to disseminate information about different ways to conserve water.</p>
            </div>
            <div class="tips_section relative">
                <div class="tips-buttons top-2 flex relative border border-4 border-blue-300 bg-blue-200 text-black items-center justify-center rounded-2xl mx-auto w-12/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
                    <div class="tips-label" @click="showContent('students')">
                        <a href="#" class="px-4 md:px-8 lg:px-12 py-2 md:py-4 text-xs md:text-base">For Students </a>
                    </div>
                    <div class="tips-label" @click="showContent('staffs')">
                        <a href="#" class="px-4 md:px-8 lg:px-12 py-2 md:py-4 text-xs md:text-base">For Staffs</a>
                    </div>
                    <div class="tips-label" @click="showContent('sdg6')">
                        <a href="#" class="px-4 md:px-8 lg:px-12 py-2 md:py-4 text-xs md:text-base">SDG 6</a>
                    </div>
                    <div class="tips-label" @click="showContent('sdg12')">
                        <a href="#" class="px-4 md:px-8 lg:px-12 py-2 md:py-4 text-xs md:text-base">SDG 12</a>
                    </div>
                </div>
                        <div class="tip-content overflow-y-hidden">
                            <div v-if="selectedContent == 'students'" class="relative w-full sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 top-2 mx-auto rounded-lg max-w-screen-2xl p-8 overflow-y-auto h-[690px]">
                                <p class="text-2xl font-bold"><br/>What is Water Conservation?<br/><br/></p>
                                <p class="px-4 py-2 text-left"><strong>Water conservation</strong> encompasses a range of practices aimed at responsibly managing and preserving the world's freshwater resources. It involves reducing water wastage, optimizing water use efficiency, and promoting sustainable water management practices across various sectors, including agriculture, industry, and domestic consumption. <strong>Water conservation</strong> entails both individual actions, such as fixing leaks and using water-efficient appliances, and collective efforts, such as implementing water-saving policies and investing in water infrastructure.</p>
                                
                                <p class="text-2xl font-bold"><br/>10 Ways To Conserve Water as a Student<br/><br/></p>
                                <p class="px-4 py-2 text-left">
                                <ol>
                                    <li>
                                        <strong>1. Turn off Taps Properly</strong>
                                        <p>Make sure taps are fully turned off after use, avoiding drips that can waste significant amounts of water over time.</p>
                                    </li><br/>
                                    <li>
                                        <strong>2. Shorter Showers</strong>
                                        <p>Encourage shorter shower times to reduce water usage. Consider using a timer or playing a short song to keep track of time.</p>
                                    </li><br/>
                                    <li>
                                        <strong>3. Fix Leaks Promptly</strong>
                                        <p>Report any leaks in school faucets, toilets, or pipes to maintenance staff promptly to prevent water wastage.</p>
                                    </li><br/>
                                    <li>
                                        <strong>4. Use Water-Efficient Fixtures</strong>
                                        <p>Encourage the use of water-efficient fixtures such as low-flow faucets and showerheads, which can significantly reduce water consumption.</p>
                                    </li><br/>
                                    <li>
                                        <strong>5. Use Full Loads</strong>
                                        <p>When using dishwashers or laundry machines in school facilities, encourage students to wait until they have full loads before running the machines.</p>
                                    </li><br/>
                                    <li>
                                        <strong>6. Reuse Water</strong>
                                        <p>Consider reusing water from activities like washing hands or rinsing vegetables to water plants or clean outdoor areas.</p>
                                    </li><br/>
                                    <li>
                                        <strong>7. Avoid Bottled Water</strong>
                                        <p>Encourage the use of reusable water bottles instead of single-use plastic bottles to reduce waste and the water footprint associated with their production.</p>
                                    </li><br/>
                                    <li>
                                        <strong>8. Educational Initiatives</strong>
                                        <p>Organize educational initiatives or campaigns within the school community to raise awareness about the importance of water conservation and ways to reduce water usage.</p>
                                    </li><br/>
                                    <li>
                                        <strong>9. Outdoor Watering Practices</strong>
                                        <p>If applicable, educate students on responsible outdoor watering practices, such as watering plants in the early morning or evening to minimize evaporation.</p>
                                    </li><br/>
                                    <li>
                                        <strong>10. Monitor Usage</strong>
                                        <p>Install water meters or implement monitoring systems to track water usage within the school premises, encouraging students to be mindful of their water consumption.</p>
                                    </li><br/>
                                </ol>
                                </p>
                                <br/>
                                <p class="text-2xl font-bold"><br/>Water Conservation Benefits in Mitigating Climate Change<br/><br/></p>
                                <p class="px-4 py-2 text-left">Water conservation stands as a pivotal strategy in the global fight against climate change, offering a multifaceted approach to address the interconnected challenges of water scarcity, environmental degradation, and carbon emissions. At its core, water conservation embodies a holistic approach to resource management, emphasizing the responsible use and preservation of our planet's most precious resource. By adopting water conservation practices across various sectors, societies can unlock a myriad of benefits that extend far beyond the realm of water management. 

                                    <br/><br/>One of the most compelling arguments for water conservation lies in its ability to preserve ecosystems and safeguard biodiversity. As climate change exacerbates the frequency and intensity of extreme weather events, ecosystems face unprecedented threats from droughts, floods, and habitat destruction. By reducing water consumption in urban areas, agriculture, and industry, we can mitigate the stressors placed on rivers, wetlands, and aquatic habitats, thereby ensuring the resilience of natural ecosystems in the face of environmental challenges.
                                    
                                    <br/><br/>Moreover, water conservation holds immense potential in mitigating carbon emissions and mitigating the impacts of climate change. The energy-intensive nature of water supply and treatment processes contributes significantly to carbon footprints, exacerbating the very phenomenon it seeks to combat. Through the adoption of water-efficient technologies, such as rainwater harvesting, greywater recycling, and drip irrigation, we can reduce the energy demand associated with water management, thereby curbing greenhouse gas emissions and fostering a more sustainable future.
                                    
                                    <br/><br/>In the realm of agriculture, water conservation emerges as a linchpin for ensuring global food security amidst changing climatic conditions. With agriculture accounting for a substantial portion of global water usage, optimizing water use efficiency in irrigation practices becomes imperative for sustaining crop yields while minimizing environmental impacts. By embracing water-efficient irrigation techniques and promoting soil conservation measures, farmers can not only conserve water resources but also bolster their resilience to droughts and water scarcity, thereby bolstering food security for communities worldwide.
                                    
                                    <br/><br/>Furthermore, water conservation serves as a vital tool for adapting to the realities of water scarcity and building resilience in vulnerable communities. As climate change exacerbates water stress in many regions, proactive measures to conserve and manage water resources become indispensable for ensuring equitable access to clean water for all. By investing in water-saving technologies, implementing water reuse systems, and raising public awareness about water conservation, societies can empower individuals and communities to adapt to water scarcity and build a more resilient future.</p>
                            </div>
                            <div v-if="selectedContent == 'staffs'" class="relative border border-900-black w-full sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 top-2 mx-auto rounded-lg max-w-screen-2xl p-8 overflow-y-auto h-[690px]">
                                <p class="text-2xl font-bold"><br/>10 Ways To Conserve Water as School Staff<br/><br/></p>
                                <p class="px-4 py-2 text-left">
                                    <ol>
                                        <li>
                                            <strong>1. Regular Maintenance</strong>
                                            <p>Ensure that plumbing fixtures such as faucets, toilets, and pipes are regularly inspected for leaks and promptly repaired.</p>
                                        </li><br/>
                                        <li>
                                            <strong>2. Educational Programs</strong>
                                            <p>Organize educational programs or workshops for staff members to raise awareness about the importance of water conservation and provide practical tips for reducing water usage.</p>
                                        </li><br/>
                                        <li>
                                            <strong>3. Water-Efficient Fixtures</strong>
                                            <p>Install water-efficient fixtures such as low-flow faucets, aerators, and toilets in school facilities to reduce water consumption without compromising functionality.</p>
                                        </li><br/>
                                        <li>
                                            <strong>4. Smart Irrigation Practices</strong>
                                            <p>Implement smart irrigation systems or timers for outdoor landscaping to optimize watering schedules based on weather conditions and minimize water wastage.</p>
                                        </li><br/>
                                        <li>
                                            <strong>5. Encourage Responsible Behavior</strong>
                                            <p>Encourage staff members to adopt responsible water use behaviors, such as turning off taps when not in use, using water-efficient dishwashers and washing machines, and reporting leaks promptly.</p>
                                        </li><br/>
                                        <li>
                                            <strong>6. Reuse Water</strong>
                                            <p>Explore opportunities for water reuse within school facilities, such as collecting rainwater for irrigation or using treated greywater for flushing toilets.</p>
                                        </li><br/>
                                        <li>
                                            <strong>7. Monitor Usage</strong>
                                            <p>Implement monitoring systems to track water usage in different areas of the school, allowing staff to identify areas of high consumption and implement targeted conservation measures.</p>
                                        </li><br/>
                                        <li>
                                            <strong>8. Regular Inspections</strong>
                                            <p>Conduct regular inspections of water-using equipment and infrastructure to identify and address inefficiencies or leaks promptly.</p>
                                        </li><br/>
                                        <li>
                                            <strong>9. Community Engagement</strong>
                                            <p>Engage with the school community, including students, parents, and local stakeholders, to promote a culture of water conservation and encourage collective action towards sustainability goals.</p>
                                        </li><br/>
                                        <li>
                                            <strong>10. Lead by Example</strong>
                                            <p>Demonstrate leadership in water conservation efforts by setting a positive example through personal actions and advocating for sustainable practices within the school community.</p>
                                        </li><br/><br/>
                                        By implementing these tips, staff members can play a crucial role in promoting water conservation and sustainability within the school environment.
                                    </ol>
                                    
                                </p>
                            </div>
                            <div v-if="selectedContent == 'sdg6'" class="relative border border-900-black w-full sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 top-2 mx-auto rounded-lg max-w-screen-2xl p-8 overflow-y-auto h-[690px]">
                                <p class="text-2xl font-bold"><br/>What is SDG 6 all about?<br/><br/></p>
                                <p class="px-4 py-2 text-left">
                                    <strong>SDG 6</strong> stands for Sustainable Development Goal 6, which is one of the seventeen global goals established by the United Nations in 2015 as part of the 2030 Agenda for Sustainable Development.<br/> <strong>SDG 6</strong> focuses specifically on ensuring availability and sustainable management of water and sanitation for all.
                                    <br/><br/>
                                    The targets associated with <strong>SDG 6</strong> include:
                                    <br/><br/>
                                    1. <strong>Universal Access to Safe and Affordable Drinking Water</strong>: Ensure universal access to safe and affordable drinking water for all, including marginalized and vulnerable groups.
                                    <br/><br/>
                                    2. <strong>Access to Sanitation and Hygiene</strong>: Achieve access to adequate and equitable sanitation and hygiene for all, and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations.
                                    <br/><br/>
                                    3. <strong>Improving Water Quality and Ecosystems</strong>: Improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, and protecting and restoring water-related ecosystems.
                                    <br/><br/>
                                    4. <strong>Water Use Efficiency and Sustainable Management</strong>: Increase water-use efficiency and ensure sustainable withdrawals and supply of freshwater to address water scarcity and reduce the number of people suffering from water scarcity.
                                    <br/><br/>
                                    5. <strong>Integrated Water Resources Management</strong>: Implement integrated water resources management at all levels, including through transboundary cooperation as appropriate.
                                    <br/><br>
                                    6. <strong>Protecting and Restoring Water-related Ecosystems</strong>: Protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers, and lakes.
                                    <br/><br/>
                                    7. <strong>International Cooperation and Capacity Building</strong>: Support and strengthen the participation of local communities in improving water and sanitation management, and enhance international cooperation to facilitate access to clean water and sanitation.
                                    <br/><br/>
                                    <strong>SDG 6</strong> aims to ensure that everyone has access to clean water and sanitation by 2030, addressing a fundamental aspect of human well-being and sustainable development. It acknowledges the importance of water as a vital resource for health, economic development, and environmental sustainability.
                                </p>
                            </div>
                            <div v-if="selectedContent == 'sdg12'" class="relative border border-900-black w-full sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 top-2 mx-auto rounded-lg max-w-screen-2xl p-8 overflow-y-auto h-[690px]">
                                <p class="text-2xl font-bold"><br/>What is SDG 12 all about?<br/><br/></p>
                                <p class="px-4 py-2 text-left">
                                    <strong>SDG 12</strong> stands for Sustainable Development Goal 12, which is one of the seventeen global goals established by the United Nations as part of the 2030 Agenda for Sustainable Development.<br/> <strong>SDG 12</strong> focuses on ensuring sustainable consumption and production patterns.
                                    <br/><br/>
                                    The targets associated with <strong>SDG 12</strong> include:
                                    <br/><br/>
                                    <strong>Sustainable Consumption and Production</strong>: Implement the 10-Year Framework of Programmes on Sustainable Consumption and Production Patterns, all countries taking action, with developed countries taking the lead, taking into account the development and capabilities of developing countries.
                                    <br/><br/>
                                    <strong>Resource Efficiency</strong>: By 2030, achieve the sustainable management and efficient use of natural resources.
                                    <br/><br/>
                                    <strong>Food Waste Reduction</strong>: By 2030, cut in half per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses.
                                    <br/><br/>
                                    <strong>Sustainable Tourism</strong>: By 2030, ensure sustainable practices and implement tools to monitor sustainable tourism that creates jobs and promotes local culture and products.
                                    <br/><br/>
                                    <strong>Chemical Management</strong>: By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their lifecycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil to minimize their adverse impacts on human health and the environment.
                                    <br/><br/>
                                    <strong>Waste Management</strong>: By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse.
                                    <br/><br/>
                                    <strong>Corporate Sustainability Reporting</strong>: Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle.
                                    <br/><br/>
                                    <strong>Sustainable Public Procurement</strong>: By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature.
                                    <br/><br/>
                                    <strong>Consumer Information and Education</strong>: Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production.
                                    <br/><br/>
                                    <strong>Capacity Building for Sustainable Development</strong>: Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products.
                                    <br/><br/>
                                    <strong>SDG 12</strong> aims to promote sustainable consumption and production patterns to ensure that economic growth and development are environmentally sustainable and socially inclusive. It encourages responsible consumption and production practices that minimize waste generation, reduce resource depletion, and promote the efficient use of natural resources.
                                </p>
                            </div>
                        </div>
            </div>
        </div>
    </home-page>
</template>

<script>
import othersPageView from './othersPageView.vue';

export default {
    components: {
        'home-page': othersPageView,
    },
    data(){
        return {
            selectedContent: 'students'
        }
    },
    mounted(){
      
    },
    methods: {
    showContent(content) {
      this.selectedContent = content;
    }
  }   
}
</script>

<style>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>