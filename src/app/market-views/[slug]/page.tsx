import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import ReportLayout from '@/components/ReportLayout';

// ================================================
// Static Generation
// ================================================
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

// ================================================
// Metadata
// ================================================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | Zavistone Market Views`,
        description: post.summary,
    };
}

// ================================================
// Page Component
// ================================================
export default async function MarketViewPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Transform post to ReportData format
    const reportData = {
        title: post.title,
        date: post.date,
        author: post.author,
        classification: post.classification,
        reference: post.reference,
        target: post.target,
        category: post.category,
        executiveSummary: post.executiveSummary,
        keyTakeaways: post.keyTakeaways,
        content: post.content,
    };

    return <ReportLayout report={reportData} />;
}
