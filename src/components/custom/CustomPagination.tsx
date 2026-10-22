import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useSearchURLParams } from '@/hooks/useSearchURLParams';

interface Props {
    totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
    const { getSearchURLParams, setSearchURLParams } = useSearchURLParams()

    const queryPage = getSearchURLParams('page') || '1';
    const page = isNaN(+queryPage) ? 1 : +queryPage;

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setSearchURLParams('page', page.toString())
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
            >
                <ChevronLeft className="h-4 w-4" />
                Anteriores
            </Button>

            {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                    key={index}
                    variant={page === index + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Button>
            ))}

            <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
            >
                Siguientes
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};