import type { Metadata } from 'next';

import Text from '@/components/Text';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Lalasia's story, values, and mission. We craft spaces that inspire through sustainable, quality furniture with timeless design.",
  openGraph: {
    title: 'About Lalasia',
    description:
      "Learn about Lalasia's story, values, and mission. We craft spaces that inspire through sustainable, quality furniture with timeless design.",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Text view="p-32" weight="bold" className={styles.title}>
          About Lalasia
        </Text>
        <Text view="p-20" className={styles.subtitle}>
          Crafting spaces that inspire
        </Text>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <Text view="p-20" weight="bold" className={styles.sectionTitle}>
            Our Story
          </Text>
          <Text view="p-18" className={styles.text}>
            Lalasia was born from a simple belief: that furniture should be more than functional—it
            should tell a story. Founded in 2020, we&apos;ve dedicated ourselves to curating pieces
            that blend Scandinavian minimalism with contemporary comfort, creating spaces where life
            unfolds naturally.
          </Text>
        </section>

        <section className={styles.section}>
          <Text view="p-20" weight="bold" className={styles.sectionTitle}>
            Our Values
          </Text>
          <div className={styles.values}>
            <div className={styles.value}>
              <Text view="p-18" weight="bold">
                Sustainability
              </Text>
              <Text view="p-16">
                We source materials responsibly and partner with manufacturers who share our
                commitment to the environment.
              </Text>
            </div>
            <div className={styles.value}>
              <Text view="p-18" weight="bold">
                Quality
              </Text>
              <Text view="p-16">
                Every piece is selected for its craftsmanship, durability, and timeless design.
              </Text>
            </div>
            <div className={styles.value}>
              <Text view="p-18" weight="bold">
                Simplicity
              </Text>
              <Text view="p-16">
                We believe in clean lines, honest materials, and designs that stand the test of
                time.
              </Text>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <Text view="p-20" weight="bold" className={styles.sectionTitle}>
            Our Mission
          </Text>
          <Text view="p-18" className={styles.text}>
            To make thoughtfully designed furniture accessible to everyone. We believe your home
            should be a sanctuary— a place where form meets function, and where every piece has
            purpose.
          </Text>
        </section>
      </div>
    </div>
  );
}
