import { faker } from "@faker-js/faker"

const createRandomData = () => {
  const type = faker.helpers.arrayElement(["surface", "wheel"])
  const id = faker.string.uuid()
  return {
    id,
    type,
    report: `${type === "surface" ? "Surface Flaw" : "Wheel Diameter"} Report #${id}`,
    datetime: String(faker.date.past()),
    image: faker.image.url(),
    data: {
      trainNo: faker.number.int({ min: 1, max: 10 }),
      compNo: faker.number.int({ min: 1, max: 10 }),
      wheelNo: faker.number.int({ min: 1, max: 10 }),
      status: faker.helpers.arrayElement(["Flawed", "Good"]),
      recommendation: faker.lorem.sentence(),
    },
  }
}

export const dummyData = faker.helpers.multiple(createRandomData, {
  count: 20,
})

export const sampleData = [
  {
    id: 1,
    type: "surface",
    report: "Surface Flaw Report #1",
    datetime: "03/23/25 12:00 PM",
    image: "https://xqdvjceijygcvemywprk.supabase.co/storage/v1/object/public/images/surface/surface_flaw_test.jpg",
    data: {
      trainNo: 1,
      compNo: 4,
      wheelNo: 2,
      status: "Flawed",
      recommendation: "For Replacment",
    },
  },
  {
    id: 2,
    type: "wheel",
    report: "Wheel Diameter Report #2",
    datetime: "03/23/25 12:00 PM",
    image: "https://xqdvjceijygcvemywprk.supabase.co/storage/v1/object/public/images/wheel/wheel_diameter_test.png",
    data: {
      trainNo: 1,
      compNo: 4,
      wheelNo: 2,
      diameter: "650 mm",
      recommendation: "Good Condition, For Monitoring",
    },
  },
]
