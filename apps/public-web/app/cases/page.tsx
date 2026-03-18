'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

type CaseItem = {
  id: number;
  title: string;
  category: string;
  client: string;
  deliveryDate: string;
  benefits: string;
  description: string;
  tech: string[];
  detail: string;
};

const cases: CaseItem[] = [
  {
    id: 1,
    title: '企業向け業務システム開発',
    category: 'Webアプリケーション',
    client: '製造業 A社（従業員約500名）',
    deliveryDate: '2023年3月納品',
    benefits: '受発注処理時間約60%削減、在庫精度向上、レポート自動化で業務効率を大幅改善',
    description: '大規模な業務効率化システムの開発を担当。最新の技術スタックを活用し、高いパフォーマンスと使いやすさを実現しました。',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    detail: `お客様は従業員数約500名の製造業で、従来の紙・Excelベースの業務プロセスに課題を抱えていました。受発注・在庫・生産計画を一貫して管理できる業務システムの構築を依頼されました。

当社では要件定義から設計・開発・テスト・本番移行まで一貫して担当。フロントエンドにReact、バックエンドにNode.js、データベースにPostgreSQLを採用し、レスポンシブなUIと高負荷に耐えうるAPIを実現しました。段階的なリリースにより、既存業務を止めることなくスムーズに移行を完了しています。

導入後、受発注処理時間の約60%削減、在庫精度の向上、レポート作成の自動化により、業務効率が大幅に改善されました。`,
  },
  {
    id: 2,
    title: 'モバイルアプリケーション開発',
    category: 'モバイルアプリ',
    client: '物流・配送業 B社',
    deliveryDate: '2023年7月納品',
    benefits: '配達記録の入力漏れ削減、本社でのリアルタイム進捗把握、現場満足度の向上',
    description: 'iOS/Android対応のネイティブアプリを開発。ユーザーフレンドリーなUI/UX設計により、高い評価を獲得しました。',
    tech: ['React Native', 'TypeScript'],
    detail: `物流・配送業のお客様より、ドライバー向けの業務支援アプリの開発依頼をいただきました。オフラインでも動作し、配達状況の記録・写真撮影・署名取得を一元管理できることが要件でした。

React NativeとTypeScriptでiOS/Androidの両対応アプリを開発。オフライン時のデータ同期、カメラ・GPS連携、プッシュ通知を実装しました。UI/UXは現場の声を反映したシンプルな操作性を心がけ、タッチ操作や文字サイズにも配慮しています。

リリース後、配達記録の入力漏れが減少し、本社での進捗把握がリアルタイムで可能になりました。ユーザー満足度調査でも高評価をいただいています。`,
  },
  {
    id: 3,
    title: 'クラウド移行プロジェクト',
    category: 'インフラ構築',
    client: 'ITサービス業 C社',
    deliveryDate: '2022年11月納品',
    benefits: 'インフラコスト約30%削減、障害復旧時間の短縮、開発・テスト環境の柔軟な構築が可能に',
    description: '既存システムのクラウド移行を支援。AWS環境への移行により、コスト削減とスケーラビリティの向上を実現しました。',
    tech: ['AWS', 'Docker', 'Kubernetes'],
    detail: `オンプレミスで運用していた基幹系Webアプリケーションを、AWSへ移行するプロジェクトを支援しました。ダウンタイムを最小限に抑えつつ、セキュリティとコストのバランスを取ることが目標でした。

現行システムの分析後、EC2・RDS・S3を中心とした構成で移行計画を策定。Dockerコンテナ化とKubernetes（EKS）によるオーケストレーションで、スケーラビリティと運用の効率化を実現しました。CI/CDパイプラインの構築により、デプロイ時間も短縮しています。

移行後、インフラコストの約30%削減、障害時の復旧時間短縮、開発・テスト環境の柔軟な構築が可能になり、お客様のDX推進に貢献しました。`,
  },
  {
    id: 4,
    title: 'システム統合プロジェクト',
    category: 'システム統合',
    client: '流通・小売業 D社（複数子会社）',
    deliveryDate: '2023年9月納品',
    benefits: 'データ重複入力の解消、経営ダッシュボードで全社状況をリアルタイム把握、保守コスト削減',
    description: '複数の既存システムを統合し、一元管理できるプラットフォームを構築。業務効率が大幅に向上しました。',
    tech: ['REST API', 'Microservices'],
    detail: `複数の子会社・部門でバラバラに運用されていた販売・在庫・会計システムを、一つのプラットフォームに統合するプロジェクトを請け負いました。既存データの移行と、各部門の業務フローを損なわないことが条件でした。

REST APIによるマイクロサービスアーキテクチャを採用し、段階的に統合を進めました。認証・認可の統一、データ連携の設計、既存システムとの並行稼働期間の設定により、リスクを抑えながら移行を完了しています。

統合後、データの重複入力が解消され、経営ダッシュボードで全社の状況をリアルタイムに把握できるようになりました。保守コストの削減と、今後の機能追加のしやすさも評価いただいています。`,
  },
  {
    id: 5,
    title: '会計・経理業務システム刷新',
    category: '業務システム',
    client: '中堅会計事務所 E社',
    deliveryDate: '2024年1月納品',
    benefits: '月次締め作業の工数50%削減、仕訳・照合の自動化、税務申告準備期間の短縮',
    description: '会計事務所向けの経理・仕訳・レポート一元管理システムを構築。API連携により銀行・請求書データを自動取り込みし、作業工数を大幅に削減しました。',
    tech: ['Java', 'Oracle', 'Vue.js'],
    detail: `中堅会計事務所様より、経理業務の効率化とミス防止を目的とした業務システムの刷新をご依頼いただきました。複数クライアントの仕訳・試算表・税務申告書類を一元的に管理し、銀行明細や請求書データとの自動照合が要件でした。

Java（Spring Boot）とOracleを基盤に、Vue.jsで操作性の高い画面を構築。銀行API・スキャンOCR・電子帳簿との連携により、仕訳入力から月次締めまでを効率化しました。権限管理と監査ログにより、セキュリティとコンプライアンスにも対応しています。

納品後、月次締め作業の工数が約50%削減され、仕訳・照合の自動化により入力ミスも減少。税務申告準備期間の短縮により、お客様のサービス品質向上に貢献しています。`,
  },
  {
    id: 6,
    title: 'ECサイト構築・決済連携',
    category: 'Webアプリケーション',
    client: '食品卸・小売 F社',
    deliveryDate: '2023年12月納品',
    benefits: 'オンライン売上拡大、在庫・受注の一元管理、顧客リピート率向上',
    description: 'BtoB・BtoC向けECサイトの新規構築。決済・在庫・受注管理を一貫して連携し、売上拡大と業務効率化を両立しました。',
    tech: ['PHP', 'MySQL', 'Stripe連携'],
    detail: `食品卸・小売業のお客様より、既存の電話・FAX受注に加え、オンライン注文を受け付けるECサイトの構築をご依頼いただきました。会員登録・カタログ表示・カート・決済・在庫連携・受注管理まで一貫したシステムが要件でした。

PHP（Laravel）とMySQLで基幹を構築し、決済にはStripeを連携。在庫は既存の基幹システムとAPIで連携し、受注データの二重入力がないよう設計しました。管理画面では受注一覧・在庫アラート・売上レポートを提供し、運用負荷を抑えています。

リリース後、オンライン経由の売上が順調に伸び、在庫・受注の一元管理により業務負荷の増加を抑えつつ、顧客のリピート注文も増加。お客様のデジタル販路拡大に寄与しました。`,
  },
  {
    id: 7,
    title: '保険業向け契約・請求管理システム',
    category: '業務システム',
    client: '地域保険代理店 G社',
    deliveryDate: '2024年4月納品',
    benefits: '契約・更新業務の効率化、請求漏れの防止、顧客への案内自動化で満足度向上',
    description: '保険代理店向けの契約管理・更新リマインド・請求書発行を一元化したシステムを開発。手作業だった照合・案内を自動化し、請求漏れを防止しました。',
    tech: ['.NET', 'SQL Server', 'Azure'],
    detail: `地域で複数保険会社の代理店を展開するお客様より、契約・更新・請求業務を一元管理し、リマインドや請求書発行を自動化するシステムの開発をご依頼いただきました。これまでExcelと紙で管理していた契約情報のデジタル化と、更新時期に合わせた顧客への案内自動送信が目標でした。

.NET（C#）とSQL Serverで基幹システムを構築し、Azure上でホスティング。契約データの登録・更新日管理・リマインドメール送信・請求書PDF生成・簡易レポート機能を実装しました。権限に応じた画面制御とログ取得により、個人情報の取り扱いにも配慮しています。

納品後、契約・更新業務の効率化が進み、請求漏れが防止されました。顧客への案内が自動化したことで、満足度の向上と問い合わせ削減にもつながっています。`,
  },
  {
    id: 8,
    title: '人事・勤怠管理システム新規構築',
    category: '業務システム',
    client: '建設業 H社（従業員約300名）',
    deliveryDate: '2019年3月納品',
    benefits: '打刻ミス削減、残業時間の可視化、給与計算業務の効率化',
    description: '建設現場向けの勤怠集計・休暇管理・給与連携システムを構築。現場と本社のデータを一元化しました。',
    tech: ['Java', 'PostgreSQL', 'Vue.js'],
    detail: `建設業のお客様より、複数現場に分散する従業員の勤怠管理を効率化するシステムの構築をご依頼いただきました。打刻データの集計、有給・休暇管理、給与システムとの連携が要件でした。Java（Spring Boot）とPostgreSQLで基幹を構築し、Vue.jsで管理画面を実装。納品後、打刻ミスの削減と残業時間の可視化により、適正な勤務管理が可能になりました。`,
  },
  {
    id: 9,
    title: '顧客管理・営業支援CRM',
    category: 'Webアプリケーション',
    client: '商社 I社',
    deliveryDate: '2019年10月納品',
    benefits: '商談履歴の一元管理、リード育成の効率化、営業予測の精度向上',
    description: '商社向けの顧客・商談・案件管理CRMを開発。営業活動の可視化とフォローアップを支援しました。',
    tech: ['Ruby on Rails', 'MySQL', 'JavaScript'],
    detail: `商社様より、顧客情報と商談履歴を一括管理し、営業活動を可視化するCRMの構築をご依頼いただきました。Ruby on RailsとMySQLで開発し、商談ステータス・フォローリマインド・レポート機能を実装。導入後、商談の取りこぼしが減り、営業予測の精度が向上しました。`,
  },
  {
    id: 10,
    title: '基幹システムの帳票・BI連携',
    category: '業務システム',
    client: '製造業 J社',
    deliveryDate: '2020年2月納品',
    benefits: '月次レポート作成時間の短縮、経営指標のリアルタイム把握、意思決定の迅速化',
    description: '既存基幹システムからデータを取得し、帳票出力とBIダッシュボードを構築。経営層向けの可視化を実現しました。',
    tech: ['Python', 'SQL Server', 'Power BI連携'],
    detail: `製造業のお客様より、基幹システムのデータを活用した帳票自動出力と経営ダッシュボードの構築をご依頼いただきました。Pythonでデータ抽出・集計処理を実装し、Power BIと連携。月次レポート作成時間の短縮と、経営指標のリアルタイム把握を実現しました。`,
  },
  {
    id: 11,
    title: '社内ポータル・ワークフローシステム',
    category: 'Webアプリケーション',
    client: 'サービス業 K社（従業員約200名）',
    deliveryDate: '2020年8月納品',
    benefits: '申請・承認のペーパーレス化、処理時間の短縮、社内情報の集約',
    description: '社内ポータルと経費・休暇申請のワークフローを一元化。承認ルートのカスタマイズと通知機能を実装しました。',
    tech: ['PHP', 'Laravel', 'Vue.js'],
    detail: `サービス業のお客様より、社内ポータルと経費・休暇申請の電子化をご依頼いただきました。LaravelとVue.jsでポータル画面とワークフローエンジンを構築。申請・承認のペーパーレス化により処理時間が短縮し、社内情報の集約にも貢献しました。`,
  },
  {
    id: 12,
    title: '在庫・発注最適化システム',
    category: '業務システム',
    client: '卸売業 L社',
    deliveryDate: '2021年1月納品',
    benefits: '欠品率の低減、発注業務の効率化、在庫回転率の改善',
    description: '在庫状況に応じた発注提案と発注書出力を自動化。需要予測と安全在庫の設定により適正在庫を実現しました。',
    tech: ['C#', '.NET Core', 'SQL Server'],
    detail: `卸売業のお客様より、在庫と発注業務の最適化システムの開発をご依頼いただきました。.NET CoreとSQL Serverで在庫管理・発注点管理・発注書自動作成を実装。欠品率の低減と在庫回転率の改善により、業務効率が向上しました。`,
  },
  {
    id: 13,
    title: '教育機関向けLMS・出欠管理',
    category: 'Webアプリケーション',
    client: '専門学校 M校',
    deliveryDate: '2021年11月納品',
    benefits: '出欠・成績の一元管理、教材配布の効率化、学習進捗の可視化',
    description: '専門学校向けの学習管理（LMS）と出欠・成績管理システムを構築。教員・生徒・事務の利用を想定した画面を設計しました。',
    tech: ['React', 'Node.js', 'MongoDB'],
    detail: `専門学校様より、オンライン教材配布・出欠管理・成績管理を一括で行えるLMSの構築をご依頼いただきました。ReactとNode.jsで開発し、役割に応じた画面と権限を実装。教材配布と出欠・成績の一元管理により、教務業務の効率化に貢献しました。`,
  },
  {
    id: 14,
    title: '予約・決済一体化プラットフォーム',
    category: 'Webアプリケーション',
    client: '宿泊・観光業 N社',
    deliveryDate: '2022年5月納品',
    benefits: '予約と決済の一元化、キャンセル対応の効率化、売上レポートの自動化',
    description: '宿泊・体験の予約受付とオンライン決済を一体化。キャンセルポリシーとリマインドメールも自動化しました。',
    tech: ['TypeScript', 'Next.js', 'Stripe'],
    detail: `宿泊・観光業のお客様より、予約受付と決済を一体化したプラットフォームの構築をご依頼いただきました。Next.jsとStripeで予約・決済・キャンセル処理を実装。予約と決済の一元化により、運用負荷の削減と売上レポートの自動化を実現しました。`,
  },
  {
    id: 15,
    title: '生産計画・スケジューリングシステム',
    category: '業務システム',
    client: '製造業 O社',
    deliveryDate: '2022年9月納品',
    benefits: '納期遵守率の向上、稼働率の最適化、計画変更への柔軟な対応',
    description: '受注と在庫・能力を考慮した生産計画とスケジュール表を自動生成。計画変更時の再計算もサポートしました。',
    tech: ['Python', 'PostgreSQL', 'Vue.js'],
    detail: `製造業のお客様より、受注と在庫・設備能力を考慮した生産計画とスケジューリングの自動化をご依頼いただきました。Pythonで計画エンジンを開発し、Vue.jsで計画表・ガントチャートを表示。納期遵守率の向上と稼働率の最適化に貢献しました。`,
  },
  {
    id: 16,
    title: '医療機関向け診療予約・受付システム',
    category: '業務システム',
    client: 'クリニック P院',
    deliveryDate: '2023年1月納品',
    benefits: '電話予約の削減、待ち時間の短縮、受付業務の効率化',
    description: '患者向けのWeb予約と院内受付画面を一体化。診療科・医師・枠管理とリマインド通知を実装しました。',
    tech: ['Vue.js', 'Java', 'PostgreSQL'],
    detail: `クリニック様より、患者がWebで予約でき、院内で受付・案内ができるシステムの構築をご依頼いただきました。Vue.jsで患者向け予約画面と院内受付画面を開発。電話予約の削減と待ち時間の短縮により、患者満足度と受付業務の効率が向上しました。`,
  },
  {
    id: 17,
    title: 'API連携・データ連携基盤',
    category: 'インフラ構築',
    client: 'ITサービス業 Q社',
    deliveryDate: '2024年6月納品',
    benefits: 'システム間連携の標準化、開発工数の削減、障害検知の迅速化',
    description: '複数システム間のAPI連携とデータ同期の基盤を構築。認証・ログ・リトライを共通化しました。',
    tech: ['Node.js', 'Kafka', 'AWS'],
    detail: `ITサービス業のお客様より、複数システム間のAPI連携とデータ同期を標準化する基盤の構築をご依頼いただきました。Node.jsとKafkaでメッセージング基盤を構築し、AWS上で運用。連携の標準化により開発工数を削減し、障害検知の迅速化にも貢献しました。`,
  },
  {
    id: 18,
    title: '採用管理・求人サイト連携',
    category: '業務システム',
    client: '人材サービス R社',
    deliveryDate: '2024年10月納品',
    benefits: '応募者情報の一元管理、選考進捗の可視化、求人サイトとの自動連携',
    description: '採用管理（ATS）と求人サイト・メール連携を構築。応募から内定までの選考フローを可視化しました。',
    tech: ['React', 'Ruby on Rails', 'PostgreSQL'],
    detail: `人材サービス業のお客様より、応募者管理と求人サイト連携ができる採用管理システムの開発をご依頼いただきました。ReactとRuby on RailsでATSを構築し、求人サイトAPI・メール連携を実装。応募者情報の一元管理と選考進捗の可視化により、採用業務の効率化に貢献しました。`,
  },
  {
    id: 19,
    title: 'サブスクリプション・継続課金システム',
    category: 'Webアプリケーション',
    client: 'SaaS企業 S社',
    deliveryDate: '2025年2月納品',
    benefits: '継続課金の自動化、解約・アップグレードのセルフサービス、売上予測の精度向上',
    description: 'サブスク型サービスの契約・課金・解約を一貫して管理。Stripe連携と管理画面を構築しました。',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    detail: `SaaS企業様より、サブスクリプション型の契約・継続課金・解約を管理するシステムの構築をご依頼いただきました。Next.jsとStripeで契約・課金・プラン変更を実装。継続課金の自動化と解約・アップグレードのセルフサービス化により、運用負荷の削減と売上予測の精度向上に貢献しました。`,
  },
];

/** 納品日文字から YYYY-MM を取得してソート用 */
function getDeliverySortKey(d: string): string {
  const m = d.match(/(\d{4})年(\d{1,2})月/);
  if (!m) return '0000-00';
  return `${m[1]}-${String(m[2]).padStart(2, '0')}`;
}

/** 時間軸用：近い→遠い（降順）でソート */
const casesByDate = [...cases].sort(
  (a, b) => getDeliverySortKey(b.deliveryDate).localeCompare(getDeliverySortKey(a.deliveryDate))
);

export default function CasesPage() {
  const refHero = useRef(null);
  const refList = useRef(null);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewList = useInView(refList, { once: true, margin: '-80px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="cases" />
      <div className="relative z-10">
        <Navbar />

        {/* 前導區塊：與 careers 同風格 */}
        <section ref={refHero} className="careers-lead relative overflow-hidden">
          <div className="careers-lead-bg" aria-hidden>
            <div className="careers-lead-bg-base" />
            <div className="careers-lead-bg-shape" />
          </div>
          <div className="careers-lead-inner relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
                className="text-sm text-gray-500 mb-4"
                aria-label="パンくず"
              >
                <Link href="/" className="hover:text-gray-700 transition-colors">ホーム</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">開発事例</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">CASES</p>
                <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  開発事例
                </h1>
                <p className="text-slate-600 mt-4 text-base leading-relaxed">
                  お客様の成功事例をご紹介します
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  お客様のビジネスを支えた実績例をご紹介します。
                  業務系Web・モバイルアプリ・クラウド移行・システム統合など、幅広い分野での開発事例を掲載しています。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={refList} className="py-24 md:py-28 bg-slate-100 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight pb-2 border-b border-slate-200 mb-2">
                実績・事例紹介
              </h2>
              <p className="text-slate-600 text-sm">お客様のビジネスを支えた実績例です。</p>
            </motion.div>

            {/* 時間軸：線置中穿過節點、左右交叉排列 */}
            <ul className="relative cases-timeline cases-timeline-zigzag">
              <span className="cases-timeline-track" aria-hidden />
              {casesByDate.map((caseItem, index) => {
                const isLeft = index % 2 === 0;
                const nodeColor = index % 3; /* 0~3 循環顏色 */
                return (
                  <motion.li
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={`cases-timeline-item relative grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-start py-4 first:pt-0 last:pb-0 group ${isLeft ? '' : ''}`}
                  >
                    {isLeft ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedCase(caseItem)}
                          className="cases-timeline-btn order-1 text-right rounded-xl py-3 px-4 transition-[background-color,color] duration-200 group/btn col-start-1 col-end-2"
                        >
                          <span className="block text-slate-500 text-xs sm:text-sm mb-0.5">{caseItem.deliveryDate}</span>
                          <span className="block text-base sm:text-lg font-bold text-slate-900 group-hover/btn:text-[#1e3a5f] transition-colors leading-snug">
                            {caseItem.title}
                          </span>
                        </button>
                        <div className={`cases-timeline-node cases-timeline-node--${nodeColor} order-2 col-start-2 col-end-3 relative z-10 flex justify-center mt-0.5`} aria-hidden />
                        <div className="order-3 col-start-3 col-end-4" aria-hidden />
                      </>
                    ) : (
                      <>
                        <div className="order-1 col-start-1 col-end-2" aria-hidden />
                        <div className={`cases-timeline-node cases-timeline-node--${nodeColor} order-2 col-start-2 col-end-3 relative z-10 flex justify-center mt-0.5`} aria-hidden />
                        <button
                          type="button"
                          onClick={() => setSelectedCase(caseItem)}
                          className="cases-timeline-btn order-3 text-left rounded-xl py-3 px-4 transition-[background-color,color] duration-200 group/btn col-start-3 col-end-4"
                        >
                          <span className="block text-slate-500 text-xs sm:text-sm mb-0.5">{caseItem.deliveryDate}</span>
                          <span className="block text-base sm:text-lg font-bold text-slate-900 group-hover/btn:text-[#1e3a5f] transition-colors leading-snug">
                            {caseItem.title}
                          </span>
                        </button>
                      </>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>

      {/* Popup：画面中央、冷色調 */}
      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSelectedCase(null)}
              aria-hidden
            />
            <div className="case-popup-wrap fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="case-popup-title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="case-popup w-[min(92vw,42rem)] max-h-[90vh] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex flex-col flex-1 min-h-0">
                  <div className="shrink-0 px-6 pt-8 pb-4 border-b border-slate-200/80">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold mb-3">
                      {selectedCase.category}
                    </span>
                    <h2 id="case-popup-title" className="text-xl font-bold text-slate-900 leading-snug mb-4">
                      {selectedCase.title}
                    </h2>
                    <div className="grid gap-2 text-sm">
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">クライアント：</span>
                        {selectedCase.client}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">納品：</span>
                        {selectedCase.deliveryDate}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">効果・メリット：</span>
                        {selectedCase.benefits}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 min-h-0 px-6 py-5 text-slate-700 text-[15px] leading-relaxed">
                    <div className="case-popup-body whitespace-pre-line">
                      {selectedCase.detail}
                    </div>
                  </div>
                  <div className="shrink-0 px-6 pt-6 pb-8 flex justify-center border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedCase(null)}
                      className="about-cta-secondary popup-close-btn"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
