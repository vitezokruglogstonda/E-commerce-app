import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'Početna',
    url: '/',
  },
  {
    id: 2,
    text: 'O nama',
    url: '/about',
  },
  {
    id: 3,
    text: 'Informisi se',
    url: '/info',
  },
  {
    id: 4,
    text: 'Prozori',
    url: '/products/prozor',
  },
  {
    id: 5,
    text: 'vrata',
    url: '/products/vrata',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'Profili',
    text:
      'Kod PVC profila važi da izborom renomiranog proizvođača profila kupujete i određeni kvalitet, što je važno jer kupujete prozore za sledećih 15-20 i više godina te je vrlo važno da sve to vreme besprekorno služe svojoj svrsi.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'Okovi',
    text:
      'Okovi su važna stvar kod svakog prozora ivrata pa stoga obratite pažnju i na taj deo vaše stolarije. Sigurno ne želite da vam okovi počnu korozirati ili da se stolarija iskrivi i teže zatvara nakon nekog vremena.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'Staklo',
    text:
      'Staklo PVC prozora ima veoma važnu ulogu u terrmoizolaciji zbog površine koju zauzima. U Termoplastu će vam naši stručnjaci u saradnji sa dugogodišnjim iskustvom pomoći da odaberete najbolje rešenje za vašu PVC stolariju.',
  },
]
