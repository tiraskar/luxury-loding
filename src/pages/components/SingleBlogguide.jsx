import { GoDotFill } from "react-icons/go";
import { Wrapper } from "../../components";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import RentalExperience from "./RentalExperience";

const SingleBlogGuide = () => {
  return (
    <div className="flex flex-col gap-y-[150px]">
      <Wrapper>
        <div className="px-2 sm:px-3 lg:px-4 xl:px-0 font-inter tracking-[-1%]">
          <p className="flex items-center text-xs text-[#A1A196] gap-1">
            Home <GoDotFill /> Blog & Guidebook <GoDotFill />
            <span className="text-black">Sedona’s secret Hike</span>
          </p>
          <div className="flex flex-col gap-y-[56px] text-[#222222]">
            <h1 className="text-[68px] font-onest tracking-tight max-w-[986px] leading-[80px]">
              Sedona’s secret Hike: Escape the crowds with this trial
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full">
                  <img src='/images/profile-alex.png' alt="" className="" />
                </div>
                <div className="flex flex-col tracking-tight font-inter ">
                  <h1 className="font-medium text-[1rem]">Alex Brown</h1>
                  <p className="text-[13px] text-[#A1A196]">Product designer | Influncer</p>
                </div>
              </div>

              <div className="flex gap-4 text-black text-2xl">
                <FaLinkedin />
                <FaSquareInstagram />
                <FaYoutube />
              </div>

            </div>
            <div>
              <img src="/images/single-blog-main.png" alt="" className="rounded-2xl" />
            </div>
            <div className="flex justify-center text-start">
              <div className="flex flex-col justify-start text-left items-center max-w-[874px] gap-y-6 leading-[40px] text-xl">
                <p>Sedona, Arizona, is renowned for its stunning red rock landscapes and enchanting hiking trails. While many flock to the popular routes, we invite you to discover a hidden gem, the Pyramid-Scorpion Loop Hike. This 2.2-mile trail offers a perfect blend of challenge and serenity. With a 300-foot elevation gain, it is considered moderately difficult and is the only hiking trail in the area with a double diamond rating on the trail map. Plus, this trailhead is conveniently located, ensuring stress-free parking and a hassle-free start to your adventure.
                </p>

                <p >
                  <strong>Distance:</strong> 2.2 miles
                </p>
                <p>
                  <strong>Elevation gain: </strong> 300 ft
                </p>
                <p>
                  <strong>Overview:</strong> A well-balanced challenge with winding ridge trails and stunning views of Cathedral Rock. Traverse over large boulders and loose rock. Take a break and sprawl out on one of the many red slick-rocks.
                </p>
                <div>
                  <img src="/images/single-guide-book-one.png" alt="" />
                </div>
                <p>
                  <strong>  Extended adventure:</strong> If you’re looking for a longer hike, the Pyramid-Scorpion Loop connects to the Scheurmann Mountain Trail and Trailhead. If you want to continue exploring after your hike, head to Secret Slickrock Trailhead where you can hike down to Buddha Beach and Oak Creek for a chilly swim! Or, take the short trail to Secret Slickrock for yet another incredible view of Cathedral Rock and Oak Creek.
                </p>
                <p>
                  <strong>Staying with us:</strong> The trailhead is a short drive from our vacation rentals. Only 8 minutes from Hummingbird Crossing and 22 minutes from Casa Coconino, making this an easy option for hikers staying at our properties.
                </p>
                <p>
                  <strong>Come prepared:</strong>
                  Remember to bring water, sun protection, and suitable hiking gear. As the Scorpion Trail is rugged, wear sturdy shoes. A headlamp or flashlight is vital for early morning or late afternoon excursions.
                </p>
                <div>
                  <img src="/images/single-guide-book-two.png" alt="" />
                </div>
                <p>
                  <strong>  Bringing furry friends:</strong> The Pyramid-Scorpion Loop Hike is dog friendly, offering an ideal, crowd free opportunity to hike with your four-legged companion. Ensure that your pup is in good shape for the challenging terrain and bring extra water
                </p>
              </div>
            </div>
          </div>

        </div>
      </Wrapper>
      <RentalExperience />
    </div>
  );
};

export default SingleBlogGuide;